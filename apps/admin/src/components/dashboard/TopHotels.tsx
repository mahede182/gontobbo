"use client";
import { useHotels } from "@/hooks/useHotels";

export const TopHotels = () => {
  const { hotels } = useHotels();
  return (
    <div className="card" style={{ flex: 1 }}>
      <div className="flex justify-between align-center mb-24">
        <h3 style={{ fontSize: "16px", fontWeight: 600 }}>Top Hotels</h3>
        <span style={{ color: "var(--color-primary)", fontSize: "12px", cursor: "pointer" }}>
          view →
        </span>
      </div>
      <div className="flex flex-col gap-12">
        {hotels?.slice(0, 5).map((hotel: any) => (
          <div
            key={hotel.id}
            className="flex justify-between align-center py-8"
            style={{ borderBottom: "1px solid #F5F5F5" }}>
            <div className="flex align-center gap-12">
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "#F2F8FD",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  color: "var(--color-primary)",
                }}>
                {hotel.name[0]}
              </div>
              <span style={{ fontSize: "14px", fontWeight: 500 }}>{hotel.name}</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "14px", fontWeight: 600 }}>$124.5k</p>
              <p style={{ fontSize: "10px", color: "#47B881" }}>↑ 5.6%</p>
            </div>
          </div>
        )) || <p>Loading...</p>}
      </div>
    </div>
  );
};
