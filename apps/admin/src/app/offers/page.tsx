"use client";
import { useOffers } from "@/hooks/useOffers";
import { useTrips } from "@/hooks/useTrips";
import { OfferRow } from "@/components/offers/OfferRow";
import { PageHeader } from "@/components/layout/PageHeader";
import { TableHead } from "@/components/common/Table/TableHead";
import { TableSkeleton } from "@/components/common/TableSkeleton";
import { useTranslation } from "react-i18next";

export default function OffersTripsPage() {
  const { offers, isLoading: offersLoading, mutate: mutateOffers } = useOffers();
  const { trips, isLoading: tripsLoading } = useTrips();
  const { t } = useTranslation();

  return (
    <div className="offers-trips-page">
      <PageHeader title={t("offers.title")} breadcrumb={t("offers.breadcrumb")} />
      <div className="card mb-24">
        <h3>{t("offers.offers")}</h3>
        {offersLoading ? (
          <TableSkeleton columns={5} rows={3} />
        ) : (
          <table className="w-full text-left mt-12">
            <thead>
              <tr>
                <TableHead>{t("offers.offer")}</TableHead>
                <TableHead>{t("offers.location")}</TableHead>
                <TableHead>{t("offers.value")}</TableHead>
                <TableHead>{t("offers.status")}</TableHead>
                <TableHead>{t("common.actions")}</TableHead>
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
        <h3>{t("offers.trips")}</h3>
        {tripsLoading ? (
          <TableSkeleton columns={3} rows={3} />
        ) : (
          <table className="w-full text-left mt-12">
            <thead>
              <tr>
                <TableHead>{t("offers.tripTitle")}</TableHead>
                <TableHead>{t("offers.destination")}</TableHead>
                <TableHead>{t("offers.price")}</TableHead>
              </tr>
            </thead>
            <tbody>
              {trips?.map((trip: any) => (
                <tr key={trip.id}>
                  <td className="p-12">{trip.title}</td>
                  <td className="p-12">{trip.destination}</td>
                  <td className="p-12">${trip.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
