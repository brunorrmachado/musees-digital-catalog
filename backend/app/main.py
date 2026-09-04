from fastapi import FastAPI

from app.routes.artwork_routes import router

from app.routes.artwork_cc0_routes import router as cc0_router

from app.routes.analytics_routes import (
    router as analytics_router
)

app = FastAPI()

app.include_router(router)
app.include_router(cc0_router)
app.include_router(analytics_router)

@app.get("/")
def home():
    return {
        "project": "Musees",
        "status": "online"
    }