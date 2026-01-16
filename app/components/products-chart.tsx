"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartData = {
  week: string;
  products: number;
};

interface ProductChartProps {
  data: ChartData[];
}

export default function ProductChart({ data }: ProductChartProps) {
  const [ weeksToShow, setWeeksToShow ] = useState(11);
  
  useEffect(() => {
    const updateWeeks = () => {
      if (window.innerWidth < 361) {
        setWeeksToShow(5);
      }
      if (window.innerWidth < 421) {
        setWeeksToShow(7);
      }
    };

    updateWeeks(); // run on mount
    window.addEventListener("resize", updateWeeks);

    return () => window.removeEventListener("resize", updateWeeks);
  }, []);

  const chartData = data.slice(-weeksToShow);

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="week"
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />

          <Area
            type="monotone"
            dataKey="products"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.2}
            strokeWidth={2}
            dot={{ fill: "#8b5cf6", r: 4 }}
            activeDot={{ fill: "#8b5cf6", r: 4 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            labelStyle={{ color: "#374151", fontWeight: "500" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
