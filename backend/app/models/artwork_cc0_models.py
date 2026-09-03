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

    source_id = Column(Text)

    title = Column(Text)

    author = Column(Text)

    museum = Column(Text)

    public_url = Column(Text)

    image_url = Column(Text)

    license = Column(Text)

    download_url = Column(Text)