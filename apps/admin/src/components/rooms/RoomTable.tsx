"use client";
import React from "react";
import { ArrowUpDown, DoorOpen } from "lucide-react";
import { RoomRow } from "./RoomRow";
import { EmptyState } from "@/components/common/EmptyState";
import { useTranslation } from "react-i18next";

export const RoomTable = ({ rooms, onEdit }: any) => {
  const { t } = useTranslation();

  return (
    <>
      <table className="data-table">
        <thead>
          <tr>
            <th>{t("rooms.id")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("rooms.roomName")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("rooms.hotel")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("rooms.bedType")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("rooms.view")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("rooms.status")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("rooms.price")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("rooms.capacity")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("common.action")}</th>
          </tr>
        </thead>
        <tbody>
          {rooms?.map((room: any) => (
            <RoomRow key={room.id} room={room} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
      {(!rooms || rooms.length === 0) && (
        <EmptyState icon={DoorOpen} title={t("rooms.noRoomsFound")} description={t("rooms.noRoomsMatch")} />
      )}
    </>
  );
};
