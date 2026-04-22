import { PageHeader } from "@/components/layout/PageHeader";
import { FileSpreadsheet } from "lucide-react";

export default function InvoicesPage() {
  return (
    <div className="invoices-page">
      <PageHeader title="Invoices" breadcrumb="Home > Invoices" />
      <div
        className="card"
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            backgroundColor: "#F1F5F9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
          }}>
          <FileSpreadsheet size={32} color="#64748B" />
        </div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
            color: "#1E293B",
          }}>
          Invoices & Billing
        </h2>
        <p style={{ color: "#64748B", maxWidth: "400px" }}>
          The invoices module is currently being built. You will soon have access to all billing,
          receipts, and financial records.
        </p>
      </div>
    </div>
  );
}
