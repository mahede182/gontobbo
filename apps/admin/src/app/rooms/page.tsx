"use client";
import { useState } from "react";
import { useRooms } from "@/hooks/useRooms";
import { useHotels } from "@/hooks/useHotels";
import { RoomTable } from "@/components/rooms/RoomTable";
import { PageHeader } from "@/components/layout/PageHeader";
import { Maximize, Grid, Plus } from "lucide-react";
import { Pagination } from "@/components/common/Pagination";

export default function RoomsPage() {
  const [hotelId, setHotelId] = useState("");
  const [page, setPage] = useState(1);
  const { rooms, meta, isLoading } = useRooms(hotelId, page, 10);
  const { hotels } = useHotels();

  return (
    <div className="rooms-page">
      <PageHeader title="Rooms" breadcrumb="Home > Rooms" />

      <div className="card">
        <div className="flex justify-between align-center mb-24">
          <h3 style={{ fontSize: "18px", fontWeight: 600 }}>Hotel Rooms</h3>
          <div className="flex gap-12">
            <button
              className="action-btn"
              style={{ background: "var(--color-primary)", color: "white" }}>
              <Plus size={16} style={{ marginRight: 4 }} /> Add Room
            </button>
            <button className="action-btn">
              <Maximize size={16} />
            </button>
            <button className="action-btn">
              <Grid size={16} />
            </button>
          </div>
        </div>

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
              <span style={{ fontSize: "13px", color: "#666" }}>Hotel:</span>
              <select
                className="table-filter-select"
                style={{ width: "180px" }}
                value={hotelId}
                onChange={(e) => setHotelId(e.target.value)}>
                <option value="">All Hotels</option>
                {hotels?.map((h: any) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
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
              placeholder="Search room here..."
              className="border-none bg-transparent"
              style={{ fontSize: "13px", width: "100%" }}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-24 text-center">Loading rooms...</div>
        ) : (
          <RoomTable
            rooms={rooms}
            onEdit={(room: any, type: string) => alert(`${type} - ${room.name}`)}
          />
        )}

        <div className="pagination-wrapper">
          <p style={{ fontSize: "12px", color: "#999" }}>
            Showing 1 to {rooms?.length || 0} of {meta?.totalItems || 0} entries
          </p>
          {meta && <Pagination current={page} total={meta.totalPages} onPageChange={setPage} />}
        </div>
      </div>
    </div>
  );
}
