"use client";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
export const RevenueChart = ({ data }: any) => (
  <ResponsiveContainer height={300}>
    <AreaChart data={data}>
      <Area type="monotone" dataKey="value" stroke="#4A90E2" fill="#4A90E222" />
    </AreaChart>
  </ResponsiveContainer>
);
