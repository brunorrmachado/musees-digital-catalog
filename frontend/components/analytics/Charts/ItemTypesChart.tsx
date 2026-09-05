"use client";

import { ResponsiveBar } from "@nivo/bar";

type ItemType = {
  item_type: string;
  count: number;
};

type Props = {
  data: ItemType[];
};

export default function ItemTypesChart({
  data,
}: Props) {
  return (
    <div
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <ResponsiveBar
        data={data}
        keys={["count"]}
        indexBy="item_type"
        margin={{
          top: 50,
          right: 40,
          bottom: 120,
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
          tickRotation: -35,
          legend: "Tipo de Item",
          legendPosition: "middle",
          legendOffset: 85,
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