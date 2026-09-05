import Image from "next/image";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";

import {
  getSummary,
  getAcquisitionMethods,
  getItemTypes,
  getProductionYears,
  getCenturies,
} from "@/services/analyticsService";

import AcquisitionMethodsChart from "@/components/analytics/Charts/AcquisitionMethodsChart";
import DashboardCard from "@/components/analytics/Cards/DashboardCard";
import ItemTypesChart from "@/components/analytics/Charts/ItemTypesChart";
import CenturiesChart from "@/components/analytics/Charts/CenturiesChart";
import ProductionTimelineChart from "@/components/analytics/Charts/ProductionTimelineChart";
import AnalyticsCard from "@/components/analytics/Cards/AnalyticsCard";
import AnalyticsGrid from "@/components/layout/AnalyticsGrid";


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
        <PageContainer>
            <PageHeader
                activePage="analytics"
                badgeText={`${summary.total_artworks} obras`}
            />

            <AnalyticsGrid>
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
                value={summary.oldest_production_year}
                />

                <DashboardCard
                title="Última Aquisição"
                value={summary.latest_acquisition_year}
                />
            </AnalyticsGrid>

            <div
                style={{
                marginTop: "24px",
                }}
            >
                <AnalyticsCard title="Métodos de Aquisição">
                <AcquisitionMethodsChart
                    data={acquisitionMethods}
                />
                </AnalyticsCard>
            </div>
        </PageContainer>
    );    
}