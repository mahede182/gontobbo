"use client";
import { Bell, Maximize, Grid, Moon, Search } from "lucide-react";

export const Topbar = () => (
  <header className="topbar">
    <div
      className="flex align-center gap-12"
      style={{
        background: "#F9F9FB",
        padding: "8px 16px",
        borderRadius: "8px",
        border: "1px solid #EEE",
        width: "300px",
      }}>
      <Search size={16} color="#999" />
      <input
        type="text"
        placeholder="Search..."
        className="border-none bg-transparent"
        style={{ fontSize: "14px", width: "100%" }}
      />
    </div>

    <div className="topbar-icons">
      <div style={{ padding: "4px" }}>
        <img src="https://flagcdn.com/w20/us.png" alt="US" style={{ width: "20px" }} />
      </div>
      <Grid size={20} />
      <Maximize size={20} />
      <div style={{ position: "relative" }}>
        <Bell size={20} />
        <span
          style={{
            position: "absolute",
            top: -2,
            right: -2,
            background: "#F64C4C",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            border: "2px solid white",
          }}></span>
      </div>
      <Moon size={20} />
      <div className="flex align-center gap-8">
        <img src="https://i.pravatar.cc/150?u=admin" className="profile-avatar" alt="Admin" />
      </div>
    </div>
  </header>
);
