from app.database.database import engine
from app.models.artwork_models import Base

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