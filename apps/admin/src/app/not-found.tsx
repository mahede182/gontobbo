"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
        padding: "2rem",
      }}>
      <div
        style={{
          fontSize: "8rem",
          fontWeight: "900",
          color: "#E2E8F0",
          lineHeight: "1",
          letterSpacing: "-0.05em",
          marginBottom: "1rem",
        }}>
        404
      </div>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#1E293B",
          marginBottom: "1rem",
        }}>
        Page Not Found
      </h2>
      <p
        style={{
          color: "#64748B",
          maxWidth: "400px",
          marginBottom: "2rem",
          fontSize: "1.1rem",
        }}>
        The page you are looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={() => router.back()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#fff",
            color: "#0F172A",
            border: "1px solid #E2E8F0",
            borderRadius: "0.5rem",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#F8FAFC")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}>
          <ArrowLeft size={18} />
          Go Back
        </button>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0F172A",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            fontWeight: "500",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1E293B")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0F172A")}>
          <Home size={18} />
          Return Home
        </Link>
      </div>
    </div>
  );
}
