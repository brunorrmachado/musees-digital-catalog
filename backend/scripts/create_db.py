from app.database.database import engine
from app.database.database import Base

from app.models.artwork_models import Artwork
from app.models.artwork_cc0_models import (
    CC0Artwork,
    CC0ArtworkAnalytics,
)

print(Base.metadata.tables)

for nome in Base.metadata.tables:
    print(nome)

try:
    Base.metadata.create_all(bind=engine)

    print("Tabelas criadas")

except Exception as e:
    print("Erro")
    print(type(e))
    print(e)

print("\nTabelas encontradas:\n")

for nome in Base.metadata.tables:
    print(nome)