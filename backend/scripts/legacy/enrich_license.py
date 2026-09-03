import requests
from bs4 import BeautifulSoup

from app.database.database import SessionLocal
from app.models.artwork_models import Artwork

BASE_URL = "https://www.parismuseescollections.paris.fr"

db = SessionLocal()

# TESTE: apenas 1 registro
artworks = (
    db.query(Artwork)
    .filter(Artwork.public_url.isnot(None))
    .filter(Artwork.license.is_(None))
    .limit(1)
    .all()
)

print(f"Obras encontradas: {len(artworks)}")

for artwork in artworks:

    print("\nProcessando:")
    print(artwork.title)

    try:

        response = requests.get(
            artwork.public_url,
            timeout=30
        )

        if response.status_code != 200:
            print("Erro ao acessar página")
            continue

        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )

        # -------------------------
        # LICENÇA
        # -------------------------

        license_name = None

        license_tag = soup.find(
            "a",
            class_=lambda c: c and "licence" in c
        )

        if license_tag:
            license_name = (
                license_tag
                .get_text(strip=True)
            )

        # -------------------------
        # DOWNLOAD
        # -------------------------

        download_url = None

        download_tag = soup.find(
            "a",
            class_="download-zip"
        )

        if (
            download_tag
            and download_tag.get("href")
        ):
            download_url = (
                BASE_URL +
                download_tag["href"]
            )

        artwork.license = license_name
        artwork.download_url = download_url

        print("Licença :", license_name)
        print("Download:", download_url)

    except Exception as e:
        print("Erro:", e)

db.commit()
db.close()

print("\nConcluído.")