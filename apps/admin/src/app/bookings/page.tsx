"use client";
import { useState } from "react";
import { useBookings } from "@/hooks/useBookings";
import { BookingTable } from "@/components/bookings/BookingTable";
import { Pagination } from "@/components/common/Pagination";
import { PageHeader } from "@/components/layout/PageHeader";

export default function BookingsPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const { bookings, meta, isLoading, mutate } = useBookings({ page, status });

  return (
    <div className="bookings-page">
      <PageHeader title="Bookings" breadcrumb="Home > Bookings" />
      <div className="card">
        <div className="table-controls mb-24">
          <div className="flex gap-12 align-center">
            <div className="flex gap-8 align-center">
              <span style={{ fontSize: "13px", color: "#666" }}>Show</span>
              <select className="table-filter-select" style={{ minWidth: "70px" }}>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex gap-8 align-center" style={{ marginLeft: "24px" }}>
              <span style={{ fontSize: "13px", color: "#666" }}>Status:</span>
              <select
                className="table-filter-select"
                style={{ width: "150px" }}
                value={status}
                onChange={(e) => setStatus(e.target.value)}>
                <option value="">All Status</option>
                <option value="PENDING">PENDING</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="CANCELLED">CANCELLED</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>
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
              placeholder="Search booking..."
              className="border-none bg-transparent"
              style={{ fontSize: "13px", width: "100%" }}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-24 text-center">Loading bookings...</div>
        ) : (
          <BookingTable bookings={bookings} mutate={mutate} />
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
