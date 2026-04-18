"use client";
import { useOffers } from "@/hooks/useOffers";
import { useTrips } from "@/hooks/useTrips";
import { OfferRow } from "@/components/offers/OfferRow";
import { PageHeader } from "@/components/layout/PageHeader";
import { TableHead } from "@/components/common/Table/TableHead";

export default function OffersTripsPage() {
  const { offers, isLoading: offersLoading, mutate: mutateOffers } = useOffers();
  const { trips, isLoading: tripsLoading } = useTrips();

  return (
    <div className="offers-trips-page">
      <PageHeader title="Offers & Trips" breadcrumb="Home > Marketing" />
      <div className="card mb-24">
        <h3>Offers</h3>
        {offersLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full text-left mt-12">
            <thead>
              <tr>
                <TableHead>Offer</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </tr>
            </thead>
            <tbody>
              {offers?.map((o: any) => (
                <OfferRow key={o.id} offer={o} mutate={mutateOffers} />
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="card">
        <h3>Trips</h3>
        {tripsLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full text-left mt-12">
            <thead>
              <tr>
                <TableHead>Trip Title</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Price</TableHead>
              </tr>
            </thead>
            <tbody>
              {trips?.map((t: any) => (
                <tr key={t.id}>
                  <td className="p-12">{t.title}</td>
                  <td className="p-12">{t.destination}</td>
                  <td className="p-12">${t.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
