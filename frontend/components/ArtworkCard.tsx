"use client";

import { useState } from "react";
import Image from "next/image";

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
  artwork: Artwork;
  onClick: () => void;
};

export default function ArtworkCard({
  artwork,
  onClick,
}: Props) {
  const [isHovered, setIsHovered] =
    useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() =>
        setIsHovered(true)
      }
      onMouseLeave={() =>
        setIsHovered(false)
      }
      style={{
        position: "relative",

        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",

        background: "#fff",

        cursor: "pointer",

        transition: "all .25s ease",

        transform: isHovered
          ? "translateY(-8px)"
          : "translateY(0)",

        boxShadow: isHovered
          ? "0 20px 40px rgba(0,0,0,.18)"
          : "0 2px 8px rgba(0,0,0,.08)",
      }}
    >
      {/* IMAGEM */}

      <img
        src={artwork.image_url}
        alt={artwork.title}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />

      {/* DADOS */}

      <div
        style={{
          padding: "16px",
        }}
      >
        <h2
          style={{
            margin: "0 0 12px",
            fontSize: "1.2rem",
          }}
        >
          "{artwork.title}"
        </h2>

        <p
          style={{
            margin: "0 0 8px",
          }}
        >
          <strong>Autor:</strong>{" "}
          {artwork.author}
        </p>

        <p
          style={{
            margin: "0 0 12px",
          }}
        >
          <strong>Museu:</strong>{" "}
          {artwork.museum}
        </p>

        <Image
          src="/cc0.svg"
          alt="CC0"
          width={15}
          height={15}
        />
      </div>

      {/* OVERLAY */}

      <div
        style={{
          position: "absolute",
          inset: 0,

          background: isHovered
            ? "rgba(0,0,0,.45)"
            : "rgba(0,0,0,0)",

          backdropFilter: isHovered
            ? "blur(8px)"
            : "blur(0px)",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          opacity: isHovered ? 1 : 0,

          transition: "all .3s ease",

          pointerEvents: "none",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          Acessar
        </span>
      </div>
    </div>
  );
}