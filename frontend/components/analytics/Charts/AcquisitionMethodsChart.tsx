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
        height: "300px",
        width: "400px",
      }}
    >
      <ResponsiveBar
        data={data}
        keys={["count"]}
        indexBy="label"
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
          legend: "Método de Aquisição",
          legendPosition: "middle",
          legendOffset: 60,
        }}
        valueScale={{
          type:"linear",
          min:0,
          max:10,
        }}
        axisLeft={{
          tickValues: [0 ,2 ,4 ,6 ,8 ,10],
          legend: "Quantidade",
          legendPosition: "middle",
          legendOffset: -45,
        }}
        theme={{
          axis: {
            ticks: {
              text: {
                fontSize: 10,
              },
            },
            legend: {
              text: {
                fontSize: 10,
              },
            },
          },
        }}
      />
    </div>
  );
}