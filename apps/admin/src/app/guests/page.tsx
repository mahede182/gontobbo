"use client";
import { useState } from "react";
import { useBookings } from "@/hooks/useBookings";
import { BookingTable } from "@/components/bookings/BookingTable";
import { Pagination } from "@/components/common/Pagination";
import { PageHeader } from "@/components/layout/PageHeader";
import { Maximize, Grid } from "lucide-react";

export default function GuestsPage() {
  const [page, setPage] = useState(1);
  const { bookings, meta, isLoading } = useBookings({ page, limit: 10 });

  return (
    <div className="users-page">
      <PageHeader title="Users" breadcrumb="Home > Users" />
      <div className="card">
        <div className="flex justify-between align-center mb-24">
          <h3 style={{ fontSize: "18px", fontWeight: 600 }}>Bookings</h3>
          <div className="flex gap-12">
            <button className="action-btn">
              <Maximize size={16} />
            </button>
            <button className="action-btn">
              <Grid size={16} />
            </button>
          </div>
        </div>

        <div className="table-controls mb-24">
          <div className="flex gap-8 align-center">
            <span style={{ fontSize: "13px", color: "#666" }}>Show</span>
            <select className="table-filter-select" style={{ minWidth: "70px" }}>
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </select>
          </div>
          <div
            className="flex align-center gap-12"
            style={{
              background: "#F9F9FB",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid #EEE",
              width: "240px",
            }}>
            <input
              type="text"
              placeholder="Search here..."
              className="border-none bg-transparent"
              style={{ fontSize: "13px", width: "100%" }}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-24 text-center">Loading bookings...</div>
        ) : (
          <BookingTable bookings={bookings} />
        )}

        <div className="pagination-wrapper">
          <p style={{ fontSize: "12px", color: "#999" }}>
            Showing 1 to {bookings?.length || 0} of {meta?.totalItems || 0} entries
          </p>
          {meta && <Pagination current={page} total={meta.totalPages} onPageChange={setPage} />}
        </div>
      </div>
    </div>
  );
}
