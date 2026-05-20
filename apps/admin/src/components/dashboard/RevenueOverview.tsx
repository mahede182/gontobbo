"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";

const data = [
  { name: "10.00", uv: 30, pv: 24, amt: 24 },
  { name: "20.00", uv: 25, pv: 42, amt: 22 },
  { name: "30.00", uv: 38, pv: 35, amt: 20 },
  { name: "40.00", uv: 32, pv: 52, amt: 21 },
  { name: "50.00", uv: 45, pv: 48, amt: 25 },
  { name: "60.00", uv: 40, pv: 60, amt: 21 },
];

export const RevenueOverview = () => {
  const { t } = useTranslation();

  return (
    <div className="card" style={{ flex: 2 }}>
      <div className="flex justify-between align-center mb-24">
        <h3 style={{ fontSize: "16px", fontWeight: 600 }}>{t("dashboard.revenueOverview")}</h3>
        <div className="flex gap-12">
          <span
            style={{
              fontSize: "12px",
              color: "#999",
              border: "1px solid #EEE",
              padding: "4px 12px",
              borderRadius: "4px",
            }}>
            Mar 8, 2026 - Mar 8, 2026
          </span>
        </div>
      </div>
      <div className="flex justify-between mb-24" style={{ textAlign: "center" }}>
        <div>
          <p style={{ color: "#999", fontSize: "12px" }}>{t("dashboard.bookings")}</p>
          <strong>
            825 <span style={{ color: "#47B881", fontSize: "10px" }}>↑ 24%</span>
          </strong>
        </div>
        <div>
          <p style={{ color: "#999", fontSize: "12px" }}>{t("dashboard.revenue")}</p>
          <strong>
            $89k <span style={{ color: "#47B881", fontSize: "10px" }}>↑ 24%</span>
          </strong>
        </div>
        <div>
          <p style={{ color: "#999", fontSize: "12px" }}>{t("dashboard.expense")}</p>
          <strong>
            $68k <span style={{ color: "#F64C4C", fontSize: "10px" }}>↓ 24%</span>
          </strong>
        </div>
        <div>
          <p style={{ color: "#999", fontSize: "12px" }}>{t("dashboard.profit")}</p>
          <strong>
            $21k <span style={{ color: "#47B881", fontSize: "10px" }}>↑ 24%</span>
          </strong>
        </div>
      </div>
      <div style={{ height: "240px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#499DD2" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#499DD2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#999" }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#999" }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#499DD2"
              fillOpacity={1}
              fill="url(#colorPv)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
