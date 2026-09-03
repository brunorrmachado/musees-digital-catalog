from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Artwork(Base):

    __tablename__ = "artworks"

    id = Column(Integer, primary_key=True)

    adlib_id = Column(
        Text,
        unique=True
    )

    title = Column(Text)

    image_url = Column(Text)

    license = Column(Text)

    download_url = Column(Text)

    author = Column(Text)

    museum = Column(Text)

    description = Column(Text)

    content_type = Column(Text, nullable=True)

    source_url = Column(Text)

    public_url = Column(Text)