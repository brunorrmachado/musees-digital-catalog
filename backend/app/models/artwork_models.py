from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Artwork(Base):

    __tablename__ = "artworks"

    id = Column(Integer, primary_key=True)

    adlib_id = Column(Text)

    title = Column(Text)

    image_url = Column(Text)

    author = Column(Text)

    museum = Column(Text)

    description = Column(Text)

    source_url = Column(Text)