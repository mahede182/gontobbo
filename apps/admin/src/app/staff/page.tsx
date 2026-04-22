import { PageHeader } from "@/components/layout/PageHeader";
import { Users } from "lucide-react";

export default function StaffPage() {
  return (
    <div className="staff-page">
      <PageHeader title="Staff Management" breadcrumb="Home > Staff" />
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
          <Users size={32} color="#64748B" />
        </div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
            color: "#1E293B",
          }}>
          Staff Management
        </h2>
        <p style={{ color: "#64748B", maxWidth: "400px" }}>
          The staff management module is under construction. Soon you will be able to manage
          employees, roles, and schedules here.
        </p>
      </div>
    </div>
  );
}
