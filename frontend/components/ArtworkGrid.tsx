"use client";

import { useState } from "react";

import ArtworkCard from "./ArtworkCard";
import ArtworkModal from "./ArtworkModal";

type Artwork = {
  id: number;
  title: string;
  author: string;
  museum: string;
  image_url: string;
  license: string;
  download_url: string;
};

type Props = {
  artworks: Artwork[];
};

export default function ArtworkGrid({
  artworks,
}: Props) {
  const [selectedArtwork, setSelectedArtwork] =
    useState<Artwork | null>(null);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "24px",
        }}
      >
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onClick={() =>
              setSelectedArtwork(artwork)
            }
          />
        ))}
      </div>

      <ArtworkModal
        artwork={selectedArtwork}
        onClose={() =>
          setSelectedArtwork(null)
        }
      />
    </>
  );
}