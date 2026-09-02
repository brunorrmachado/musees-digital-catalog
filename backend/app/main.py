from fastapi import FastAPI

from app.routes.artwork_routes import router

app = FastAPI()

app.include_router(router)

@app.get("/")
def home():
    return {
        "project": "Musees",
        "status": "online"
    }