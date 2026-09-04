import Image from "next/image";

import { getArtworks } from "../services/cc0Artworkservice";
import ArtworkGrid from "../components/ArtworkGrid";

type Artwork = {
  id: number;
  title: string;
  author: string;
  museum: string;
  image_url: string;
  license: string;
  download_url: string;
};

export default async function Home() {
  const artworks: Artwork[] = await getArtworks();

  return (
    <main
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <Image
          src="/logo.svg"
          alt="Art Catalog"
          width={400}
          height={100}
        />

        <span
          style={{
            background: "#111827",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            fontSize: "1rem",
          }}
        >
          {artworks.length} obras
        </span>
      </div>

      {/* GALERIA */}

      <ArtworkGrid artworks={artworks} />
    </main>
  );
}