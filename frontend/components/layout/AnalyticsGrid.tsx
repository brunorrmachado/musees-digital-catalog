import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AnalyticsGrid({
  children,
}: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "24px",
      }}
    >
      {children}
    </div>
  );
}