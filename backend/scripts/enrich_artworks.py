import requests
from bs4 import BeautifulSoup

from app.database.database import SessionLocal
from app.models.artwork_models import Artwork


BASE_URL = "https://www.parismuseescollections.paris.fr"

db = SessionLocal()

# TESTE: apenas 10 registros
artworks = (
    db.query(Artwork)
    .filter(Artwork.image_url.is_(None))
    .limit(10)
    .all()
)

print(f"Obras encontradas: {len(artworks)}")


for artwork in artworks:

    termo = artwork.title.strip()

    print(f"\nBuscando: {termo}")

    try:

        response = requests.get(
            f"{BASE_URL}/fr/recherche",
            params={"keywords": termo},
            timeout=30,
        )

        if response.status_code != 200:
            print("Erro na busca")
            continue

        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )

        obras = soup.find_all(
            "article",
            class_=lambda c: c and "node-oeuvre" in c
        )

        obra_encontrada = None

        for obra in obras:

            titulo_html = obra.find("h3")

            if not titulo_html:
                continue

            titulo_resultado = (
                titulo_html
                .get_text(strip=True)
            )

            if titulo_resultado.lower() == termo.lower():
                obra_encontrada = obra
                break

        if obra_encontrada is None:
            print("Correspondência exata não encontrada")
            continue

        # imagem
        img = obra_encontrada.find("img")

        image_url = None

        if img:
            image_url = img.get("src")

        # url pública
        link = obra_encontrada.find(
            "a",
            href=True
        )

        public_url = None

        if link:
            public_url = (
                BASE_URL +
                link["href"]
            )

        # autor
        author = None

        autor_div = obra_encontrada.find(
            "div",
            class_="auteur-nom"
        )

        if autor_div:
            author = autor_div.get_text(
                strip=True
            )

        # museu
        museum = None

        campos = obra_encontrada.find_all(
            "div",
            class_="field-item"
        )

        for campo in campos:

            texto = campo.get_text(
                " ",
                strip=True
            )

            if "musée" in texto.lower():
                museum = texto
                break

        artwork.image_url = image_url

        if author:
            artwork.author = author

        if museum:
            artwork.museum = museum

        if not image_url:
            print("Sem imagem encontrada")
            continue

        print("OK")
        print("Imagem :", image_url)
        print("Autor  :", author)
        print("Museu  :", museum)

        artwork.image_url = image_url

        if author:
            artwork.author = author

        if museum:
            artwork.museum = museum

    except Exception as e:
        print("Erro:", e)

db.commit()

print("\nConcluído.")