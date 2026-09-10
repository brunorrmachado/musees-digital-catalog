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
        enableGridY={true}
        enableGridX={false}
        axisBottom={{
          legend: "Século",
          legendPosition: "middle",
          legendOffset: 60,
        }}
        valueScale={{
          type: "linear",
          min: 0,
          max: 50,
        }}
        axisLeft={{
          legend: "Quantidade",
          legendPosition: "middle",
          legendOffset: -45,
        }}
        layers={[
          "grid",
          "axes",
          "bars",
          ({ bars }) => (
            <>
              {bars.map((bar) => (
                <text
                  key={bar.key}
                  x={bar.x + bar.width / 2}
                  y={bar.y - 8}
                  textAnchor="middle"
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    fill: "#111827",
                  }}
                >
                  {bar.data.value}
                </text>
              ))}
            </>
          ),
        ]}
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