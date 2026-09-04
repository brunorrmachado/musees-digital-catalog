from sqlalchemy import (
    Column,
    Integer,
    Text
)

from app.database.database import Base


class CC0Artwork(Base):

    __tablename__ = "cc0_artworks"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    source_id = Column(
        Text,
        unique=True
    )

    title = Column(Text)

    author = Column(Text)

    museum = Column(Text)

    public_url = Column(Text)

    image_url = Column(Text)

    license = Column(Text)

    download_url = Column(Text)


class CC0ArtworkAnalytics(Base):

    __tablename__ = "cc0_artworks_analytics"

    id = Column(Integer, primary_key=True)

    source_id = Column(Text, unique=True)

    title = Column(Text)

    author = Column(Text)

    museum = Column(Text)

    public_url = Column(Text)

    image_url = Column(Text)

    license = Column(Text)

    download_url = Column(Text)

    production_date_text = Column(Text)

    production_year = Column(Integer)

    century_text = Column(Text)

    item_types = Column(Text)

    acquisition_method = Column(Text)

    acquisition_date_text = Column(Text)

    acquisition_year = Column(Integer)

    production_to_acquisition_gap = Column(Integer)
