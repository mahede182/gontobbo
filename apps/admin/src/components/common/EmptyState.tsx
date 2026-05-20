"use client";
import React from "react";
import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import { useTranslation } from "react-i18next";

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
}

export const EmptyState = ({
  icon: Icon = Inbox,
  title,
  description,
}: EmptyStateProps) => {
  const { t } = useTranslation();
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={32} />
      </div>
      <h3 className="empty-state-title">{title || t("common.noDataFound")}</h3>
      <p className="empty-state-desc">{description || t("common.noRecordsToDisplay")}</p>
    </div>
  );
};
