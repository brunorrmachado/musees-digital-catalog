from sqlalchemy import create_engine

DATABASE_URL = (
    "postgresql://postgres:pg1036@localhost:1036/Paris_Musees"
)

try:
    engine = create_engine(DATABASE_URL)

    with engine.connect():
        print("Conectado ao banco Paris_Musees")

except Exception as e:
    print("ERRO")
    print(e)