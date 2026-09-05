"use client";

import { ResponsiveLine } from "@nivo/line";

type YearData = {
  year: number;
  count: number;
};

type Props = {
  data: YearData[];
};

export default function ProductionTimelineChart({
  data,
}: Props) {
  const chartData = [
    {
      id: "Produção",
      data: data.map((item) => ({
        x: item.year,
        y: item.count,
      })),
    },
  ];

  return (
    <div
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <ResponsiveLine
        data={chartData}
        margin={{
          top: 50,
          right: 50,
          bottom: 80,
          left: 60,
        }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
        }}
        pointSize={10}
        useMesh={true}
        colors={["#111827"]}
        axisBottom={{
          legend: "Ano de Produção",
          legendOffset: 60,
          legendPosition: "middle",
        }}
        axisLeft={{
          legend: "Quantidade",
          legendOffset: -45,
          legendPosition: "middle",
        }}
      />
    </div>
  );
}