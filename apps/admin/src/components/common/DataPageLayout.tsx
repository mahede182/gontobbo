"use client";
import React from "react";
import { Search } from "lucide-react";
import { Pagination } from "./Pagination";
import { TableSkeleton } from "./TableSkeleton";
import { PageHeader } from "@/components/layout/PageHeader";
import { useTranslation } from "react-i18next";
import type { FilterConfig } from "@/types";

interface DataPageLayoutProps {
  title: string;
  breadcrumb: string;
  children: React.ReactNode;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  totalItems?: number;
  currentCount?: number;
  page: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  actions?: React.ReactNode;
  isLoading?: boolean;
  skeletonColumns?: number;
  skeletonRows?: number;
}

export const DataPageLayout = ({
  title,
  breadcrumb,
  children,
  searchPlaceholder = "Search...",
  filters = [],
  totalItems = 0,
  currentCount = 0,
  page,
  totalPages = 1,
  onPageChange,
  actions,
  isLoading = false,
  skeletonColumns = 6,
  skeletonRows = 5,
}: DataPageLayoutProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader title={title} breadcrumb={breadcrumb} />
      <div className="card">
        {/* Toolbar */}
        <div className="data-page-toolbar">
          <div className="data-page-toolbar-left">
            <div className="data-page-filter-group">
              <span className="data-page-filter-label">{t("common.show")}</span>
              <select className="table-filter-select">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            {filters.map((filter) => (
              <div key={filter.label} className="data-page-filter-group">
                <span className="data-page-filter-label">{filter.label}:</span>
                <select
                  className="table-filter-select"
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  style={{ minWidth: "130px" }}
                >
                  {filter.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="data-page-toolbar-right">
            <div className="data-page-search">
              <Search size={15} className="data-page-search-icon" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="data-page-search-input"
              />
            </div>
            {actions}
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <TableSkeleton columns={skeletonColumns} rows={skeletonRows} />
        ) : (
          children
        )}

        {/* Pagination Footer */}
        <div className="pagination-wrapper">
          <p className="data-page-showing">
            {t("common.showingEntries", { current: currentCount, total: totalItems })}
          </p>
          {totalPages > 1 && (
            <Pagination current={page} total={totalPages} onPageChange={onPageChange} />
          )}
        </div>
      </div>
    </div>
  );
};
