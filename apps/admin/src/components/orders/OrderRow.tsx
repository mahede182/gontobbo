"use client";
import React from "react";
import { Eye, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

export const OrderRow = ({ order }: { order: any }) => {
  const { t } = useTranslation();

  const getStatusClass = (status: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
      case "DELIVERED":
        return "badge-completed";
      case "PENDING":
        return "badge-pending";
      case "CANCELLED":
        return "badge-cancelled";
      default:
        return "badge-pending";
    }
  };

  const getTranslatedStatus = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PENDING": return t("orders.pending");
      case "PREPARING": return t("orders.preparing");
      case "DELIVERED": return t("orders.delivered");
      case "CANCELLED": return t("orders.cancelled");
      default: return status || t("orders.pending");
    }
  };

  return (
    <tr>
      <td>{order.id?.slice(0, 6) || "ORD-1"}</td>
      <td>
        <div className="flex align-center gap-12">
          <img
            src={
              order.user?.avatar ||
              `https://i.pravatar.cc/150?u=${order.user?.id || order.id || "default"}`
            }
            className="avatar-img"
            alt=""
          />
          <span style={{ fontWeight: 500 }}>
            {order.user?.firstName || t("common.guest")} {order.user?.lastName || ""}
          </span>
        </div>
      </td>
      <td>{new Date(order.createdAt || Date.now()).toLocaleDateString("en-GB")}</td>
      <td>
        <strong>${order.totalPrice || order.totalAmount || "0.00"}</strong>
      </td>
      <td>
        <span className={`badge ${getStatusClass(order.status || "PENDING")}`}>
          {getTranslatedStatus(order.status || "PENDING")}
        </span>
      </td>
      <td>
        <div className="flex">
          <button className="action-btn" aria-label="View Order">
            <Eye size={14} />
          </button>
          <button className="action-btn" aria-label="Settings">
            <Settings size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};
