"use client";

import { ResponsiveBar } from "@nivo/bar";

type AcquisitionMethod = {
  method: string;
  count: number;
};

type Props = {
  data: AcquisitionMethod[];
};

export default function AcquisitionMethodsChart({
  data,
}: Props) {
  return (
    <div
      style={{
        height: "650px",
        width: "100%",
      }}
    >
      <ResponsiveBar
        data={data}
        keys={["count"]}
        indexBy="method"
        margin={{
          top: 50,
          right: 40,
          bottom: 80,
          left: 60,
        }}
        padding={0.3}
        valueScale={{
          type: "linear",
        }}
        indexScale={{
          type: "band",
          round: true,
        }}
        colors={["#111827"]}
        borderRadius={2}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -25,
          legend: "Método de Aquisição",
          legendPosition: "middle",
          legendOffset: 60,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Quantidade",
          legendPosition: "middle",
          legendOffset: -45,
        }}
        enableLabel={false}
        animate={true}
        motionConfig="gentle"
        theme={{
          axis: {
            ticks: {
              text: {
                fontSize: 12,
              },
            },
            legend: {
              text: {
                fontSize: 14,
                fontWeight: 600,
              },
            },
          },
          tooltip: {
            container: {
              background: "#fff",
              color: "#111",
              fontSize: 12,
            },
          },
        }}
      />
    </div>
  );
}