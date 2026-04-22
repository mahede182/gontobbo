"use client";
import { useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import { OrderTable } from "@/components/orders/OrderTable";
import { TableSkeleton } from "@/components/common/TableSkeleton";
import { Pagination } from "@/components/common/Pagination";
import { PageHeader } from "@/components/layout/PageHeader";

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const { orders, meta, isLoading } = useOrders({ page, status });

  return (
    <div className="orders-page">
      <PageHeader title="Orders" breadcrumb="Home > Orders" />
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
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1); // reset to page 1 on filter
                }}>
                <option value="">All Status</option>
                <option value="PENDING">PENDING</option>
                <option value="PREPARING">PREPARING</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="CANCELLED">CANCELLED</option>
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
              placeholder="Search order..."
              className="border-none bg-transparent"
              style={{ fontSize: "13px", width: "100%" }}
            />
          </div>
        </div>

        {isLoading ? <TableSkeleton columns={6} rows={5} /> : <OrderTable orders={orders || []} />}

        <div className="pagination-wrapper mt-24">
          <p style={{ fontSize: "12px", color: "#999" }}>
            Showing 1 to {orders?.length || 0} of {meta?.totalItems || 0} entries
          </p>
          {meta && <Pagination current={page} total={meta.totalPages} onPageChange={setPage} />}
        </div>
      </div>
    </div>
  );
}
