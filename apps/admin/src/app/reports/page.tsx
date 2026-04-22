import { PageHeader } from "@/components/layout/PageHeader";
import { FileText } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="reports-page">
      <PageHeader title="Reports" breadcrumb="Home > Reports" />
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
          <FileText size={32} color="#64748B" />
        </div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
            color: "#1E293B",
          }}>
          Reports Dashboard
        </h2>
        <p style={{ color: "#64748B", maxWidth: "400px" }}>
          The reporting module is currently being developed. You will be able to view and export
          detailed analytics here soon.
        </p>
      </div>
    </div>
  );
}
