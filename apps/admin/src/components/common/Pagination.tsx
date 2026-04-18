"use client";
import React from "react";

export const Pagination = ({ current, total, onPageChange }: any) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex align-center gap-12">
      <button
        className="action-btn"
        onClick={() => onPageChange(current - 1)}
        disabled={current <= 1}
        style={{
          padding: "8px 16px",
          fontSize: "13px",
          borderRadius: "6px",
          fontWeight: 500,
          opacity: current <= 1 ? 0.4 : 1,
          cursor: current <= 1 ? "not-allowed" : "pointer",
        }}>
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "none",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            backgroundColor: current === page ? "var(--color-primary)" : "transparent",
            color: current === page ? "white" : "#666",
            minWidth: "32px",
          }}>
          {page}
        </button>
      ))}

      <button
        className="action-btn"
        onClick={() => onPageChange(current + 1)}
        disabled={current >= total}
        style={{
          padding: "8px 16px",
          fontSize: "13px",
          borderRadius: "6px",
          fontWeight: 500,
          opacity: current >= total ? 0.4 : 1,
          cursor: current >= total ? "not-allowed" : "pointer",
        }}>
        Next
      </button>
    </div>
  );
};
