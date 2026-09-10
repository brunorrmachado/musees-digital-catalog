from fastapi import APIRouter
from fastapi import HTTPException
from fastapi import Query
from sqlalchemy import func

from app.database.database import SessionLocal
from app.models.artwork_cc0_models import CC0Artwork

router = APIRouter(
    prefix="/cc0-artworks",
    tags=["CC0 Artworks"]
)


@router.get("/")
def list_cc0_artworks(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    db = SessionLocal()

    try:
        total = (
            db.query(
                func.count(CC0Artwork.id)
            )
            .scalar()
        )

        offset = (page - 1) * limit

        artworks = (
            db.query(CC0Artwork)
            .order_by(CC0Artwork.title)
            .offset(offset)
            .limit(limit)
            .all()
        )

        total_pages = (
            total + limit - 1
        ) // limit

        return {
            "page": page,
            "limit": limit,
            "total": total,
            "total_pages": total_pages,
            "items": artworks,
        }

    finally:
        db.close()


@router.get("/{artwork_id}")
def get_cc0_artwork(
    artwork_id: int
):

    db = SessionLocal()

    try:

        artwork = (
            db.query(CC0Artwork)
            .filter(
                CC0Artwork.id == artwork_id
            )
            .first()
        )

        if not artwork:

            raise HTTPException(
                status_code=404,
                detail="Obra não encontrada"
            )

        return artwork

    finally:

        db.close()


@router.get("/search/")
def search_cc0_artworks(
    q: str
):

    db = SessionLocal()

    try:

        artworks = (
            db.query(CC0Artwork)
            .filter(
                CC0Artwork.title.ilike(
                    f"%{q}%"
                )
            )
            .all()
        )

        return artworks

    finally:

        db.close()


@router.get("/stats/")
def cc0_stats():

    db = SessionLocal()

    try:

        total = (
            db.query(
                func.count(
                    CC0Artwork.id
                )
            )
            .scalar()
        )

        return {
            "total_cc0_artworks": total
        }

    finally:

        db.close()

