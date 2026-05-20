"use client";
import { useState } from "react";
import { useRooms } from "@/hooks/useRooms";
import { useHotels } from "@/hooks/useHotels";
import { RoomTable } from "@/components/rooms/RoomTable";
import { DataPageLayout } from "@/components/common/DataPageLayout";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { FilterConfig } from "@/types";

export default function RoomsPage() {
  const [hotelId, setHotelId] = useState("");
  const [page, setPage] = useState(1);
  const { rooms, meta, isLoading } = useRooms(hotelId, page, 10);
  const { hotels } = useHotels();
  const { t } = useTranslation();

  const filters: FilterConfig[] = [
    {
      label: t("rooms.hotel"),
      value: hotelId,
      options: [
        { label: t("rooms.allHotels"), value: "" },
        ...(hotels?.map((h: any) => ({ label: h.name, value: h.id })) || []),
      ],
      onChange: (v) => { setHotelId(v); setPage(1); },
    },
  ];

  return (
    <DataPageLayout
      title={t("rooms.title")}
      breadcrumb={t("rooms.breadcrumb")}
      searchPlaceholder={t("rooms.searchPlaceholder")}
      filters={filters}
      totalItems={meta?.totalItems}
      currentCount={rooms?.length || 0}
      page={page}
      totalPages={meta?.totalPages}
      onPageChange={setPage}
      isLoading={isLoading}
      skeletonColumns={9}
      actions={
        <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Plus size={16} /> {t("rooms.addRoom")}
        </button>
      }
    >
      <RoomTable rooms={rooms} onEdit={(room: any, type: string) => alert(`${type} - ${room.name}`)} />
    </DataPageLayout>
  );
}
