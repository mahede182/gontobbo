"use client";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SearchBar = () => {
  const { t } = useTranslation();

  return (
    <div className="flex align-center p-8 gap-12 border-radius-std border">
      <Search size={16} />
      <input type="text" placeholder={t("common.search")} className="border-none bg-transparent" />
    </div>
  );
};
