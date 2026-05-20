"use client";
import React from "react";
import { Eye, Download } from "lucide-react";
import type { Invoice } from "@/types";
import { useTranslation } from "react-i18next";

const getStatusBadge = (status: string) => {
  switch (status?.toUpperCase()) {
    case "PAID": return "badge-paid";
    case "OVERDUE": return "badge-overdue";
    default: return "badge-pending";
  }
};

export const InvoiceRow = ({ invoice }: { invoice: Invoice }) => {
  const { t } = useTranslation();

  const getTranslatedStatus = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PAID": return t("invoices.paid");
      case "OVERDUE": return t("invoices.overdue");
      default: return t("invoices.pending");
    }
  };

  return (
    <tr>
      <td>
        <strong>{invoice.invoiceNo || `INV-${invoice.id?.slice(0, 6)}`}</strong>
      </td>
      <td>
        <div className="flex align-center gap-12">
          <img
            src={invoice.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent((invoice.user?.firstName || "G") + " " + (invoice.user?.lastName || ""))}&background=499dd2&color=fff&size=36`}
            className="avatar-img"
            alt=""
          />
          <span style={{ fontWeight: 500 }}>
            {invoice.user?.firstName || t("common.guest")} {invoice.user?.lastName || ""}
          </span>
        </div>
      </td>
      <td><strong>${invoice.amount?.toFixed(2) || "0.00"}</strong></td>
      <td>
        <span className={`badge ${getStatusBadge(invoice.status)}`}>
          {getTranslatedStatus(invoice.status)}
        </span>
      </td>
      <td>{invoice.issuedAt ? new Date(invoice.issuedAt).toLocaleDateString("en-GB") : "—"}</td>
      <td>{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString("en-GB") : "—"}</td>
      <td>
        <div className="flex">
          <button className="action-btn" aria-label="View">
            <Eye size={14} />
          </button>
          <button className="action-btn" aria-label="Download">
            <Download size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};
