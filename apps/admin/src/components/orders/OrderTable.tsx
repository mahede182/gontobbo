"use client";
import React from "react";
import { ArrowUpDown, ClipboardList } from "lucide-react";
import { OrderRow } from "./OrderRow";
import { EmptyState } from "@/components/common/EmptyState";
import { useTranslation } from "react-i18next";

export const OrderTable = ({ orders }: { orders: any[] }) => {
  const { t } = useTranslation();

  return (
    <>
      <table className="data-table">
        <thead>
          <tr>
            <th>{t("orders.orderId")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("orders.customer")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("orders.date")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("orders.total")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("orders.status")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("common.action")}</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
      {(!orders || orders.length === 0) && (
        <EmptyState icon={ClipboardList} title={t("orders.noOrdersFound")} description={t("orders.noOrdersMatch")} />
      )}
    </>
  );
};
