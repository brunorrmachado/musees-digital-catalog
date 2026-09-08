"use client";

import { ResponsiveLine } from "@nivo/line";
import { Slider } from "@/components/ui/slider"
import { useState } from "react";

type YearData = {
  year: number;
  count: number;
};

type Props = {
  data: YearData[];
};

export default function ProductionTimelineChart({ data }: Props) {
  const [range, setRange] = useState<[number, number]>([
  1760,
  1952,
]);

  const filteredData = data.filter(
    (item) =>
      item.year >= range[0] &&
      item.year <= range[1]
  );

const chartData = [
  {
    id: "Produção",
    data: filteredData.map((item) => ({
      x: item.year,
      y: item.count,
    })),
  },
];

return (
  <div
    style={{
      height: "300px",
      width: "100%",
    }}
  >
    <p
      style={{
        fontSize: "10px",
        color: "#374151",
        marginBottom: "1rem",
      }}
    >    
      Período: {range[0]} - {range[1]}
    </p>

    <Slider
      min={1760}
      max={1952}
      step={1}
      value={range}
      onValueChange={(value) => {
        if (Array.isArray(value) && value.length === 2) {
          setRange([value[0], value[1]]);
        }
      }}
    />

      <ResponsiveLine
        data={chartData}
        margin={{
          top: 50,
          right: 40,
          bottom: 80,
          left: 60,
        }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
          min: 0,
          max: 10,
        }}
        colors={["#111827"]}
        lineWidth={2}
        pointSize={5}
        curve="monotoneX"
        enableArea={true}
        areaOpacity={0.12}
        enableGridX={false}
        useMesh={true}
        axisBottom={{
          legend: "Ano de Produção",
          legendPosition: "middle",
          legendOffset: 60,
          tickRotation: -45,
        }}
        axisLeft={{
          tickValues: [0, 2, 4, 6, 8, 10],
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
          grid: {
            line: {
              stroke: "#e5e7eb",
              strokeWidth: 1,
            },
          },
        }}
        tooltip={({ point }) => (
          <div
            style={{
              background: "#fff",
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "12px",
            }}
          >
            <strong>
              Ano: {point.data.xFormatted}
            </strong>
            <br />
            Quantidade: {point.data.yFormatted}
          </div>
        )}
      />
    </div>
  );
}