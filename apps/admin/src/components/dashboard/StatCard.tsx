"use client";
import { StatValue } from "./StatValue";
import { StatTrend } from "./StatTrend";
import { useTranslation } from "react-i18next";

export const StatCard = ({ title, value, change, className }: any) => {
  const { t } = useTranslation();
  return (
    <div className={`card ${className}`}>
      <h3>{title}</h3>
      <StatValue value={value} />
      <StatTrend change={change} label={t("common.lastMonth")} />
    </div>
  );
};
