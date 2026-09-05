"use client";

import { ResponsiveBar } from "@nivo/bar";

type CenturyData = {
  century: string;
  count: number;
};

type Props = {
  data: CenturyData[];
};

export default function CenturiesChart({
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
        indexBy="century"
        margin={{
          top: 50,
          right: 40,
          bottom: 80,
          left: 60,
        }}
        padding={0.3}
        colors={["#111827"]}
        borderRadius={2}
        enableLabel={false}
        axisBottom={{
          tickRotation: -20,
          legend: "Século",
          legendPosition: "middle",
          legendOffset: 60,
        }}
        axisLeft={{
          legend: "Quantidade",
          legendPosition: "middle",
          legendOffset: -45,
        }}
      />
    </div>
  );
}