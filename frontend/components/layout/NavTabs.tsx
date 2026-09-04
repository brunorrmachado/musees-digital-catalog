import Link from "next/link";

type Props = {
  active: "obras" | "analytics";
};

export default function NavTabs({
  active,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid #ddd",
        width: "fit-content",
        background: "#fff",
      }}
    >
      <Link
        href="/"
        style={{ fontWeight: active === "obras" ? "bold" : "normal" }}
      >
        Obras
      </Link>

      <Link
        href="/analytics"
        style={{ fontWeight: active === "analytics" ? "bold" : "normal" }}
      >
        Analytics
      </Link>
    </div>
  );
}