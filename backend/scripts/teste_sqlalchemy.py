from app.database.database import engine

try:
    with engine.connect():
        print("SQLAlchemy OK")
except Exception as e:
    print("ERRO")
    print(type(e))
    print(e)