"use client";
import { useHotels, deleteHotel } from "@/hooks/useHotels";
import { HotelTable } from "@/components/hotels/HotelTable";
import { PageHeader } from "@/components/layout/PageHeader";

export default function HotelsPage() {
  const { hotels, isLoading, mutate } = useHotels();

  const handleEdit = (hotel: any) => {
    console.log("Edit hotel:", hotel);
    // Modal implementation will go here
  };

  return (
    <div className="hotels-page">
      <PageHeader title="Hotels" breadcrumb="Home > Hotels" />
      <div className="card">
        <div className="mb-24 flex justify-between align-center">
          <h3>Hotel List</h3>
          <button className="bg-primary-light text-primary p-12 border-radius-std p-8">
            Add Hotel
          </button>
        </div>
        {isLoading ? <p>Loading...</p> : <HotelTable hotels={hotels} onEdit={handleEdit} />}
      </div>
    </div>
  );
}
