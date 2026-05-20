"use client";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("...");
  pages.push(total);
  return pages;
}

export const Pagination = ({ current, total, onPageChange }: PaginationProps) => {
  const { t } = useTranslation();
  const pages = getPageNumbers(current, total);

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(current - 1)}
        disabled={current <= 1}
      >
        {t("common.previous")}
      </button>
      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
            …
          </span>
        ) : (
          <button
            key={page}
            className={`pagination-page ${current === page ? "pagination-page--active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(current + 1)}
        disabled={current >= total}
      >
        {t("common.next")}
      </button>
    </div>
  );
};
