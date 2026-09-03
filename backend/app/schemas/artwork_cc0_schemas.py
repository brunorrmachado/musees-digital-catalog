from pydantic import BaseModel


class CC0ArtworkResponse(BaseModel):

    id: int

    source_id: str

    title: str | None

    author: str | None

    museum: str | None

    public_url: str | None

    image_url: str | None

    license: str | None

    download_url: str | None

    class Config:
        from_attributes = True