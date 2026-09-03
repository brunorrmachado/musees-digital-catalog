import requests
from bs4 import BeautifulSoup

TERMO = "Renoir"

URL = "https://www.parismuseescollections.paris.fr/fr/recherche"

response = requests.get(
    URL,
    params={"keywords": TERMO},
    timeout=30
)

print("Status:", response.status_code)

soup = BeautifulSoup(
    response.text,
    "html.parser"
)

obras = soup.find_all(
    "article",
    class_=lambda c: c and "node-oeuvre" in c
)

termo = TERMO.lower()

obra_encontrada = None

for obra in obras:

    titulo_html = obra.find("h3")

    if not titulo_html:
        continue

    titulo = titulo_html.get_text(strip=True)

    if titulo.lower() == termo:
        obra_encontrada = obra
        break

if obra_encontrada is None:
    print("Nenhuma correspondência exata encontrada.")
    exit()

# título
titulo = obra.find("h3")
titulo = titulo.get_text(strip=True) if titulo else None

# link público
link = obra.find("a", href=True)
public_url = None

if link:
    public_url = (
        "https://www.parismuseescollections.paris.fr"
        + link["href"]
    )

# imagem
img = obra.find("img")
image_url = None

if img:
    image_url = img.get("src")

# autor
autor = obra.find(
    "div",
    class_="auteur-nom"
)

author = None

if autor:
    author = autor.get_text(strip=True)

# museu
museum = None

campos_museu = obra.find_all(
    "div",
    class_="field-item"
)

for campo in campos_museu:
    texto = campo.get_text(
        " ",
        strip=True
    )

    if "musée" in texto.lower():
        museum = texto
        break

print("\nRESULTADO\n")

print("Título :", titulo)
print("Autor  :", author)
print("Museu  :", museum)
print("URL    :", public_url)
print("Imagem :", image_url)