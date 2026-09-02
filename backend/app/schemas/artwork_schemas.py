from pydantic import BaseModel


class ArtworkResponse(BaseModel):

    id: int

    title: str

    image_url: str | None = None

    author: str | None = None

    museum: str | None = None

    class Config:
        from_attributes = True


class ArtworkCreate(BaseModel):

    title: str

    image_url: str | None = None

    author: str | None = None

    museum: str | None = None

    description: str | None = None

    source_url: str | None = None