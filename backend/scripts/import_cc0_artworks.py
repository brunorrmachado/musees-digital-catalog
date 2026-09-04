import os
import requests

from bs4 import BeautifulSoup
from dotenv import load_dotenv

from sqlalchemy.exc import SQLAlchemyError

from app.database.database import SessionLocal

from app.models.artwork_cc0_models import (
    CC0ArtworkAnalytics
)

load_dotenv()

db = SessionLocal()

TOKEN = os.getenv("API_TOKEN")

GRAPHQL_URL = "https://apicollections.parismusees.paris.fr/graphql"

BASE_URL = "https://www.parismuseescollections.paris.fr"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
}


def build_public_url(alias: str | None) -> str | None:

    if not alias:
        return None

    alias = alias.strip().lstrip("/")

    return f"{BASE_URL}/fr/{alias}"


LIST_QUERY = """
{
  nodeQuery(
    limit: 100
    filter: {
      conditions: [
        {
          field: "type"
          value: "oeuvre"
        }
      ]
    }
  ) {
    entities {
      entityId
      entityLabel
      entityBundle
    }
  }
}
"""


print("Consultando obras...")

response = requests.post(
    GRAPHQL_URL,
    json={"query": LIST_QUERY},
    headers=headers,
    timeout=60,
)

response.raise_for_status()

data = response.json()

entities = (
    data
    .get("data", {})
    .get("nodeQuery", {})
    .get("entities", [])
)

print(f"Obras retornadas: {len(entities)}")

cc0_count = 0
saved_count = 0

for item in entities:

    if not item:
        continue

    entity_id = item["entityId"]

    DETAIL_QUERY = f"""
    {{
      nodeById(id: "{entity_id}") {{

        ... on NodeOeuvre {{
          title
          fieldUrlAlias
        }}

      }}
    }}
    """

    try:

        detail_response = requests.post(
            GRAPHQL_URL,
            json={"query": DETAIL_QUERY},
            headers=headers,
            timeout=60,
        )

        detail_response.raise_for_status()

        detail_data = detail_response.json()

        node = (
            detail_data
            .get("data", {})
            .get("nodeById")
        )

        if not node:
            continue

        title = node.get("title")

        alias = node.get("fieldUrlAlias")

        public_url = build_public_url(alias)

        if not public_url:
            continue

        page = requests.get(
            public_url,
            timeout=30,
        )

        page.raise_for_status()

        soup = BeautifulSoup(
            page.text,
            "html.parser"
        )

        # -------------------------
        # LICENÇA
        # -------------------------

        license_tag = soup.find(
            "a",
            class_=lambda c: c and "licence" in c
        )

        if not license_tag:
            continue

        license_name = (
            license_tag
            .get_text(strip=True)
            .upper()
        )

        if license_name != "CC0":
            continue

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
                BASE_URL
                + download_tag["href"]
            )

        # -------------------------
        # AUTOR
        # -------------------------

        author = None

        author_tag = soup.find(
            "div",
            class_="info auteur"
        )

        if author_tag:
            author = author_tag.get_text(
                strip=True
            )

        # -------------------------
        # MUSEU
        # -------------------------

        museum = None

        museum_block = soup.find(
            "div",
            class_="info musee"
        )

        if museum_block:

            museum_value = museum_block.find(
                "div",
                class_="value"
            )

            if museum_value:
                museum = museum_value.get_text(
                    strip=True
                )

        # -------------------------
        # IMAGEM HD
        # -------------------------

        image_url = None

        image_tag = soup.find(
            "img",
            class_="magnifier-thumb"
        )

        if image_tag:
            image_url = image_tag.get(
                "data-large-img-url"
            )

        # -------------------------
        # DATA DE PRODUÇÃO
        # -------------------------

        production_date_text = None
        production_year = None

        production_block = soup.find(
            "div",
            class_="field-name-field-date-production"
        )

        if production_block:

            production_date_text = (
                production_block.get_text(
                    " ",
                    strip=True
                )
            )

            year_tag = production_block.find(
                "span",
                class_="year"
            )

            if year_tag:

                try:

                    production_year = int(
                        year_tag.get_text(
                            strip=True
                        )
                    )

                except ValueError:

                    pass

        # -------------------------
        # SÉCULO
        # -------------------------

        century_text = None

        century_block = soup.find(
            "div",
            class_="field-name-field-oeuvre-siecle"
        )

        if century_block:

            century_text = (
                century_block.get_text(
                    " ",
                    strip=True
                )
            )             

        # -------------------------
        # TIPOS DE ITEM
        # -------------------------

        item_types = None

        types_block = soup.find(
            "div",
            class_="field-name-field-oeuvre-types-objet"
        )

        if types_block:

            term_list = types_block.find(
                "div",
                class_="pm-term-list"
            )

            if term_list:

                item_types = (
                    term_list.get_text(
                        ", ",
                        strip=True
                    )
                )   

        # -------------------------
        # MÉTODO DE AQUISIÇÃO
        # -------------------------

        acquisition_method = None

        acquisition_block = soup.find(
            "div",
            class_="field-name-field-modalite-acquisition"
        )

        if acquisition_block:

            term_list = acquisition_block.find(
                "div",
                class_="pm-term-list"
            )

            if term_list:

                acquisition_method = (
                    term_list.get_text(
                        strip=True
                    )
                )   

        # -------------------------
        # DATA DE AQUISIÇÃO
        # -------------------------

        acquisition_date_text = None
        acquisition_year = None

        acquisition_block = soup.find(
            "div",
            class_="field-name-field-date-acquisition"
        )

        if acquisition_block:

            acquisition_date_text = (
                acquisition_block.get_text(
                    " ",
                    strip=True
                )
            )

            year_tag = acquisition_block.find(
                "span",
                class_="year"
            )

            if year_tag:

                try:

                    acquisition_year = int(
                        year_tag.get_text(
                            strip=True
                        )
                    )

                except ValueError:

                    pass    

        # -------------------------
        # GAP HISTÓRICO
        # -------------------------

        production_to_acquisition_gap = None

        if (
            production_year is not None
            and acquisition_year is not None
        ):

            production_to_acquisition_gap = (
                acquisition_year
                - production_year
            )

        # -------------------------
        # EVITAR DUPLICATAS
        # -------------------------

        existing = (
            db.query(CC0ArtworkAnalytics)
            .filter(
                CC0ArtworkAnalytics.source_id == entity_id
            )
            .first()
        )

        if existing:
            print(
                f"Já existe: {title}"
            )
            continue

        print("\n--- ANALYTICS ---")
        print("Título:", title)
        print("Produção:", production_year)
        print("Aquisição:", acquisition_year)
        print("Método:", acquisition_method)
        print("Tipos:", item_types)
        print("Gap:", production_to_acquisition_gap)

        # -------------------------
        # SALVAR
        # -------------------------

        artwork = CC0ArtworkAnalytics(
            source_id=entity_id,
            title=title,
            author=author,
            museum=museum,
            public_url=public_url,
            image_url=image_url,
            license=license_name,
            download_url=download_url,
            production_date_text=production_date_text,
            production_year=production_year,
            century_text=century_text,
            item_types=item_types,
            acquisition_method=acquisition_method,
            acquisition_date_text=acquisition_date_text,
            acquisition_year=acquisition_year,
            production_to_acquisition_gap=production_to_acquisition_gap,
        )

        db.add(artwork)

        cc0_count += 1
        saved_count += 1

        print(f"CC0 salva: {title}")

    except (
        requests.RequestException,
        ValueError,
        KeyError,
        SQLAlchemyError,
    ) as exc:

        print(
            f"Erro ao processar {entity_id}: {exc}"
        )

        continue

# -------------------------
# COMMIT FINAL
# -------------------------

db.commit()
db.close()

print("\n----------------------")
print(f"CC0 encontradas : {cc0_count}")
print(f"CC0 salvas      : {saved_count}")
print("----------------------")
