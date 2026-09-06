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
  const formattedData = data.map((item: { century: string }) => {
    const match = item.century.match(/(\d+)e siècle/);

    return {
      ...item,
      century: match ? `${match[1]}º` : item.century,
    };
  });

  return (
    <div
      style={{
        height: "300px",
        width: "1000px",
      }}
    >
      <ResponsiveBar
        data={formattedData}
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
          legend: "Século",
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