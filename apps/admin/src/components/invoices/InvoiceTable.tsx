"use client";
import React from "react";
import { ArrowUpDown, FileSpreadsheet } from "lucide-react";
import { InvoiceRow } from "./InvoiceRow";
import { EmptyState } from "@/components/common/EmptyState";
import { useTranslation } from "react-i18next";
import type { Invoice } from "@/types";

export const InvoiceTable = ({ invoices }: { invoices: Invoice[] }) => {
  const { t } = useTranslation();

  return (
    <>
      <table className="data-table">
        <thead>
          <tr>
            <th>{t("invoices.invoiceNo")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("invoices.guest")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("invoices.amount")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("invoices.status")}</th>
            <th>{t("invoices.issued")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("invoices.dueDate")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("common.action")}</th>
          </tr>
        </thead>
        <tbody>
          {invoices?.map((inv) => (
            <InvoiceRow key={inv.id} invoice={inv} />
          ))}
        </tbody>
      </table>
      {(!invoices || invoices.length === 0) && (
        <EmptyState icon={FileSpreadsheet} title={t("invoices.noInvoicesFound")} description={t("invoices.noInvoicesMatch")} />
      )}
    </>
  );
};
