import Image from "next/image";
import Link from "next/link";

type PageHeaderProps = {
  activePage: "obras" | "analytics";
  badgeText?: string;
};

export default function PageHeader({
  activePage,
  badgeText,
}: PageHeaderProps) {
  const navLinkStyle = (
    page: "obras" | "analytics"
  ) => ({
    color: activePage === page ? "#111" : "#666",
    textDecoration: "none",
    fontWeight: activePage === page ? 600 : 400,
    transition: "color 0.2s ease",
  });

  return (
    <>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          width: "100%",
        }}
      >
        <Link href="/obras" style={{ display: "inline-flex", alignItems: "center" }}>
          <Image src="/logo.svg" alt="Musees logo" width={400} height={100} priority />
        </Link>

      </div>

      {/* NAVEGAÇÃO */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2.5rem",
        }}
      >
        <nav
          style={{
            display: "flex",
            gap: "2rem",
            fontSize: "0.8rem",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          <Link href="/obras" style={navLinkStyle("obras")}>
            Obras
          </Link>

          <Link href="/analytics" style={navLinkStyle("analytics")}>
            Analytics
          </Link>
        </nav>
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #ddd",
          marginBottom: "2.5rem",
        }}
      />
    </>
  );
}