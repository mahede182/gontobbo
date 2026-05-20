"use client";
import { useHotels, deleteHotel } from "@/hooks/useHotels";
import { HotelTable } from "@/components/hotels/HotelTable";
import { PageHeader } from "@/components/layout/PageHeader";
import { TableSkeleton } from "@/components/common/TableSkeleton";
import { useTranslation } from "react-i18next";

export default function HotelsPage() {
  const { hotels, isLoading, mutate } = useHotels();
  const { t } = useTranslation();

  const handleEdit = (hotel: any) => {
    // Modal implementation will go here
  };

  return (
    <div className="hotels-page">
      <PageHeader title={t("hotels.title")} breadcrumb={t("hotels.breadcrumb")} />
      <div className="card">
        <div className="mb-24 flex justify-between align-center">
          <h3>{t("hotels.hotelList")}</h3>
          <button className="bg-primary-light text-primary p-12 border-radius-std p-8">
            {t("hotels.addHotel")}
          </button>
        </div>
        {isLoading ? (
          <TableSkeleton columns={6} rows={5} />
        ) : (
          <HotelTable hotels={hotels} onEdit={handleEdit} />
        )}
      </div>
    </div>
  );
}
