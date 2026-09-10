import { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

export default function PageContainer({
  children,
}: PageContainerProps) {
  return (
    <main
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      {children}
    </main>
  );
}