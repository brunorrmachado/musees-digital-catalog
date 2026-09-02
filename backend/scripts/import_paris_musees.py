import os
import requests

from dotenv import load_dotenv

from app.database.database import SessionLocal
from app.models.artwork_models import Artwork

load_dotenv()

TOKEN = os.getenv("API_TOKEN")

URL = "https://apicollections.parismusees.paris.fr/graphql"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

query = """
{
  nodeQuery(
    limit: 50
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
      entityLabel
      entityUuid
    }
  }
}
"""

response = requests.post(
    URL,
    json={"query": query},
    headers=headers,
    timeout=60
)

data = response.json()

db = SessionLocal()

entities = data["data"]["nodeQuery"]["entities"]

added = 0
skipped = 0

for entity in entities:

    if entity is None:
        continue

    existing = (
        db.query(Artwork)
        .filter(
            Artwork.adlib_id == entity["entityUuid"]
        )
        .first()
    )

    if existing:
        skipped += 1
        continue

    artwork = Artwork(
        adlib_id=entity["entityUuid"],
        title=entity["entityLabel"],
        museum="Paris Musées"
    )

    db.add(artwork)

    added += 1

db.commit()

print(f"Obras inseridas: {added}")
print(f"Obras ignoradas (já existentes): {skipped}")