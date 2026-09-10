type DashboardCardProps = {
  title: string;
  value: string | number;
};

export default function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        padding: "2rem 2.5rem",
        borderRadius: "12px",
        minHeight: "100px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
      }}
    >
      <p
        style={{
          color: "#000000",
          fontSize: ".7rem",
          marginBottom: ".5rem",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          margin: 0,
          fontSize: "2rem",
          fontWeight: 600,
        }}
      >
        {value}
      </h2>
    </div>
  );
}