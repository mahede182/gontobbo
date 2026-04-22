"use client";
import React from "react";

export const TableSkeleton = ({ columns = 5, rows = 5 }: { columns?: number; rows?: number }) => {
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <table className="data-table">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i}>
                <div
                  style={{
                    height: "16px",
                    backgroundColor: "#e2e8f0",
                    borderRadius: "4px",
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  }}
                />
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
                    style={{
                      height: "20px",
                      backgroundColor: "#f1f5f9",
                      borderRadius: "4px",
                      width: j === 0 ? "40px" : "100%",
                      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                      animationDelay: `${i * 100 + j * 50}ms`,
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `,
        }}
      />
    </div>
  );
};
