import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AnalyticsCard({
  children,
}: Props) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow:
          "0 2px 8px rgba(0,0,0,.08)",
      }}
    >
      {children}
    </div>
  );
}