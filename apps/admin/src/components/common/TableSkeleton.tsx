"use client";
import React from "react";

export const TableSkeleton = ({ columns = 5, rows = 5 }: { columns?: number; rows?: number }) => (
  <div style={{ width: "100%", overflowX: "auto" }}>
    <table className="data-table">
      <thead>
        <tr>
          {Array.from({ length: columns }).map((_, i) => (
            <th key={i}>
              <div className="skeleton-bar skeleton-bar--header" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i}>
            {Array.from({ length: columns }).map((_, j) => (
              <td key={j}>
                <div
                  className="skeleton-bar"
                  style={{
                    width: j === 0 ? "40px" : "100%",
                    animationDelay: `${i * 100 + j * 50}ms`,
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
