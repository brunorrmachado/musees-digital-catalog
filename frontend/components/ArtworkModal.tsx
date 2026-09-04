"use client";

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
  artwork: Artwork | null;
  onClose: () => void;
};

export default function ArtworkModal({
  artwork,
  onClose,
}: Props) {
  if (!artwork) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.18)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "2rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          maxWidth: "700px",
          width: "100%",
          padding: "32px",
          position: "relative",

          boxShadow:
            "0 20px 60px rgba(0,0,0,.18)",
        }}
      >
        {/* FECHAR */}

        <button
          onClick={onClose}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "rotate(90deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "rotate(0deg)";
          }}
          style={{
            position: "absolute",
            top: "2px",
            right: "14px",

            border: "none",
            background: "transparent",

            fontSize: "2rem",

            cursor: "pointer",

            transition: "all .2s ease",
          }}
        >
          ✖
        </button>

        {/* TITULO */}

        <h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: 500,
            fontStyle: "italic",

            marginBottom: "2rem",
          }}
        >
          "{artwork.title}"
        </h2>

        {/* IMAGEM */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.5rem",
          }}
        >
          <img
            src={artwork.image_url}
            alt={artwork.title}
            style={{
              width: "100%",
              maxWidth: "500px",
              maxHeight: "70vh",    
            }}
          />
        </div>

        {/* DOWNLOAD */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "0rem",
            marginRight: "4.2rem",
          }}
        >
          <a
            href={artwork.download_url}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#000000";
              e.currentTarget.style.transform = "translateX(3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#000000";
              e.currentTarget.style.transform = "translateX(0)";
            }}
            style={{
              background: "#000000",
              color: "#fff",

              textDecoration: "none",

              padding: "5px 10px",
              
              fontSize: "0.7rem",
            
              borderRadius: "0",

              letterSpacing: "0.5px",

              textTransform: "uppercase",

              transition: "all .2s ease",
            }}
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
}