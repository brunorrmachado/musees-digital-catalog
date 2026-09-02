from app.database.database import SessionLocal
from app.models.artwork_models import Artwork

db = SessionLocal()

artwork = Artwork(
    title="Primeira Obra",
    image_url="https://teste.com",
    author="Bruno",
    museum="Musees"
)

db.add(artwork)

db.commit()

print("Obra inserida")