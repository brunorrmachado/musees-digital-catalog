from fastapi import APIRouter, Depends
from fastapi import HTTPException
from fastapi import Query

from fastapi.params import Depends
from requests import Session
from sqlalchemy import or_

from app.schemas.artwork_schemas import ArtworkCreate

from app.database.database import SessionLocal
from app.models.artwork_models import Artwork

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/artworks")
def get_artworks(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):

    db = SessionLocal()

    total = db.query(Artwork).count()

    offset = (page - 1) * limit

    artworks = (
        db.query(Artwork)
        .order_by(Artwork.id)
        .offset(offset)
        .limit(limit)
        .all()
    )

    total_pages = (total + limit - 1) // limit

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "total_pages": total_pages,
        "items": artworks
    }


@router.get("/artworks/search")
def search_artworks(q: str = Query(...)):

    db = SessionLocal()

    artworks = (
        db.query(Artwork)
        .filter(
            or_(
                Artwork.title.ilike(f"%{q}%"),
                Artwork.author.ilike(f"%{q}%")
            )
        )
        .all()
    )

    return artworks


@router.get("/artworks/{artwork_id}")
def get_artwork(artwork_id: int):

    db = SessionLocal()

    artwork = (
        db.query(Artwork)
        .filter(Artwork.id == artwork_id)
        .first()
    )

    if not artwork:
        raise HTTPException(
            status_code=404,
            detail="Obra não encontrada"
        )

    return artwork


@router.post("/artworks")
def create_artwork(artwork: ArtworkCreate):

    db = SessionLocal()

    new_artwork = Artwork(
        title=artwork.title,
        image_url=artwork.image_url,
        author=artwork.author,
        museum=artwork.museum,
        description=artwork.description,
        source_url=artwork.source_url
    )

    db.add(new_artwork)

    db.commit()

    db.refresh(new_artwork)

    return new_artwork


@router.delete("/artworks/{artwork_id}")
def delete_artwork(artwork_id: int):

    db = SessionLocal()

    artwork = (
        db.query(Artwork)
        .filter(Artwork.id == artwork_id)
        .first()
    )

    if not artwork:
        raise HTTPException(
            status_code=404,
            detail="Obra não encontrada"
        )

    db.delete(artwork)

    db.commit()

    return {
        "message": "Obra removida com sucesso"
    }



@router.put("/artworks/{artwork_id}")
def update_artwork(
    artwork_id: int,
    artwork_data: ArtworkCreate
):

    db = SessionLocal()

    artwork = (
        db.query(Artwork)
        .filter(Artwork.id == artwork_id)
        .first()
    )

    if not artwork:
        raise HTTPException(
            status_code=404,
            detail="Obra não encontrada"
        )

    artwork.title = artwork_data.title
    artwork.author = artwork_data.author
    artwork.museum = artwork_data.museum
    artwork.image_url = artwork_data.image_url
    artwork.description = artwork_data.description
    artwork.source_url = artwork_data.source_url

    db.commit()

    db.refresh(artwork)

    return artwork


@router.get("/artworks/museum/{museum_name}")
def get_by_museum(museum_name: str):

    db = SessionLocal()

    artworks = (
        db.query(Artwork)
        .filter(
            Artwork.museum.ilike(f"%{museum_name}%")
        )
        .all()
    )

    return artworks


@router.get("/artworks/author/{author_name}")
def get_by_author(author_name: str):

    db = SessionLocal()

    artworks = (
        db.query(Artwork)
        .filter(
            Artwork.author.ilike(f"%{author_name}%")
        )
        .all()
    )

    return artworks


@router.get("/artworks/count")
def count_artworks():

    db = SessionLocal()

    total = db.query(Artwork).count()

    return {
        "total_artworks": total
    }


@router.get("/artworks/{artwork_id}")
def get_artwork(
    artwork_id: int,
    db: Session = Depends(get_db)
):
    artwork = (
        db.query(Artwork)
        .filter(Artwork.id == artwork_id)
        .first()
    )

    return artwork