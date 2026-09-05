import { ReactNode } from "react";

type AnalyticsCardProps = {
  title: string;
  children: ReactNode;
};

export default function AnalyticsCard({
  title,
  children,
}: AnalyticsCardProps) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "1.5rem",
        minHeight: "100px",
        width: "100%",
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: "1rem",
          fontSize: "1rem",
          fontWeight: 600,
        }}
      >
        {title}
      </h3>

      {children}
    </div>
  );
}