from sqlalchemy import func

from fastapi import APIRouter
from fastapi import Depends

from app.database.database import SessionLocal
from app.models.artwork_cc0_models import (
    CC0ArtworkAnalytics,
)

from sqlalchemy import func

from app.models.artwork_cc0_models import (
    CC0ArtworkAnalytics,
)

from fastapi import APIRouter, Depends
from sqlalchemy import func

# Mapeamentos amigáveis para dashboards

ACQUISITION_METHOD_LABELS = {
    "Don manuel": "Doação",
    "Inscription rétrospective suite au récolement": "Inventário",
}

ITEM_TYPES_LABELS = {
    "Vêtements et accessoires de vêtement": "Vestimentas",
    "Textile": "Têxtil",
    "Emballage - Conditionnement": "Embalagem",
    "Photographie": "Fotos"

}


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.get("/summary")
def get_summary(
    db=Depends(get_db)
):

    total_artworks = (
        db.query(
            func.count(
                CC0ArtworkAnalytics.id
            )
        )
        .scalar()
    )

    average_gap = (
        db.query(
            func.avg(
                CC0ArtworkAnalytics.production_to_acquisition_gap
            )
        )
        .scalar()
    )

    oldest_production_year = (
        db.query(
            func.min(
                CC0ArtworkAnalytics.production_year
            )
        )
        .scalar()
    )

    latest_acquisition_year = (
        db.query(
            func.max(
                CC0ArtworkAnalytics.acquisition_year
            )
        )
        .scalar()
    )

    return {
        "total_artworks": total_artworks,
        "average_gap": round(
            average_gap,
            2
        )
        if average_gap
        else None,
        "oldest_production_year":
            oldest_production_year,
        "latest_acquisition_year":
            latest_acquisition_year,
    }


@router.get("/acquisition-methods")
def get_acquisition_methods(
    db=Depends(get_db)
):

    results = (
        db.query(
            CC0ArtworkAnalytics.acquisition_method,
            func.count(
                CC0ArtworkAnalytics.id
            ).label("count")
        )
        .group_by(
            CC0ArtworkAnalytics.acquisition_method
        )
        .order_by(
            func.count(
                CC0ArtworkAnalytics.id
            ).desc()
        )
        .all()
    )

    return [
        {
            "method": row.acquisition_method,
            "label": ACQUISITION_METHOD_LABELS.get(
                row.acquisition_method,
                row.acquisition_method,
            ),
            "count": row.count,
        }
        for row in results
    ]


@router.get("/item-types")
def get_item_types(
    db=Depends(get_db)
):

    results = (
        db.query(
            CC0ArtworkAnalytics.item_types,
            func.count(
                CC0ArtworkAnalytics.id
            ).label("count")
        )
        .group_by(
            CC0ArtworkAnalytics.item_types
        )
        .order_by(
            func.count(
                CC0ArtworkAnalytics.id
            ).desc()
        )
        .all()
    )

    return [
        {
            "item_type": row.item_types,
            "label": ITEM_TYPES_LABELS.get(
                row.item_types,
                row.item_types,
            ),
            "count": row.count,
        }
        for row in results
    ]


@router.get("/production-years")
def get_production_years(
    db=Depends(get_db)
):

    results = (
        db.query(
            CC0ArtworkAnalytics.production_year,
            func.count(
                CC0ArtworkAnalytics.id
            ).label("count")
        )
        .filter(
            CC0ArtworkAnalytics.production_year.isnot(None)
        )
        .group_by(
            CC0ArtworkAnalytics.production_year
        )
        .order_by(
            CC0ArtworkAnalytics.production_year
        )
        .all()
    )

    return [
        {
            "year": row.production_year,
            "count": row.count,
        }
        for row in results
    ]


@router.get("/centuries")
def get_centuries(
    db=Depends(get_db)
):

    results = (
        db.query(
            CC0ArtworkAnalytics.century_text,
            func.count(
                CC0ArtworkAnalytics.id
            ).label("count")
        )
        .filter(
            CC0ArtworkAnalytics.century_text.isnot(None)
        )
        .group_by(
            CC0ArtworkAnalytics.century_text
        )
        .order_by(
            func.count(
                CC0ArtworkAnalytics.id
            ).desc()
        )
        .all()
    )

    return [
        {
            "century": row.century_text,
            "count": row.count,
        }
        for row in results
    ]