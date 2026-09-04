import Image from "next/image";
import Link from "next/link";

import {
  getSummary,
  getAcquisitionMethods,
  getItemTypes,
  getProductionYears,
  getCenturies,
} from "@/services/analyticsService";

import AcquisitionMethodsChart from "@/components/analytics/AcquisitionMethodsChart";

export default async function AnalyticsPage() {
  const summary = await getSummary();

  const acquisitionMethods =
    await getAcquisitionMethods();

  const itemTypes =
    await getItemTypes();

  const productionYears =
    await getProductionYears();

  const centuries =
    await getCenturies();

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
            {summary.total_artworks} obras
            </span>
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
                fontSize: "0.95rem",
                letterSpacing: "1px",
                textTransform: "uppercase",
            }}
            >
            <Link
            href="/"
            style={{
                color: "#666",
                textDecoration: "none",
            }}
            >
            Obras
            </Link>
            <Link
            href="/analytics"
            style={{
                color: "#111",
                textDecoration: "none",
                fontWeight: 600,
            }}
            >
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

        <div
        style={{
            marginBottom: "3rem",
        }}
        >
        <h1
            style={{
            fontSize: "2rem",
            fontWeight: 500,
            marginBottom: ".5rem",
            }}
        >
            Data Analytics
        </h1>

        <p
            style={{
            color: "#666",
            margin: 0,
            }}
        >
            Estatísticas e padrões identificados no acervo CC0.
        </p>
        </div>

        {/* KPIs */}

        <div
        style={{
            display: "grid",
            gridTemplateColumns:
            "repeat(4, 1fr)",
            gap: "24px",
            width: "100%",
        }}
        >

            <DashboardCard
            title="Obras"
            value={summary.total_artworks}
            />

            <DashboardCard
            title="Gap Médio"
            value={summary.average_gap}
            />

            <DashboardCard
            title="Produção Mais Antiga"
            value={
                summary.oldest_production_year
            }
            />

            <DashboardCard
            title="Última Aquisição"
            value={
                summary.latest_acquisition_year
            }
            />
        </div>

        {/* GRÁFICO */}

        <section>
            <h2
            style={{
                width: "100%",
                marginTop: "3rem",
            }}
            >
            Métodos de Aquisição
            </h2>

            <AcquisitionMethodsChart
            data={acquisitionMethods}
            />
        </section>
        </main>
    );    
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
        <div
        style={{
            background: "#fff",
            border: "1px solid #ddd",
            padding: "2rem 2.5rem",
            borderRadius: "12px",
            minHeight: "140px",
            boxShadow:
            "0 2px 8px rgba(0,0,0,.08)",
        }}
        >
      <p
        style={{
          color: "#777",
          fontSize: ".9rem",
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