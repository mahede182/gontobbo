"use client";
import { CountryItem } from "./CountryItem";
import { useTranslation } from "react-i18next";

export const TopCountries = () => {
  const { t } = useTranslation();
  return (
    <div className="card">
      <h5>{t("dashboard.topCountry")}</h5>
      <CountryItem name="India" value="$958.5k" />
    </div>
  );
};
