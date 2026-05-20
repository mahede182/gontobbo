"use client";
import { COLOR_PRIMARY } from "@/constants/colors";
import { useTranslation } from "react-i18next";

export const Logo = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <h1 style={{ color: COLOR_PRIMARY, fontSize: "20px", letterSpacing: "2px" }}>Gontobbo</h1>
      <small style={{ color: "#777", fontSize: "10px", textTransform: "uppercase" }}>{t("common.enjoyYourStay")}</small>
    </div>
  );
};
