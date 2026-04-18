"use client";
import { RevenueOverview } from "./RevenueOverview";
import { TopHotels } from "./TopHotels";

export const MiddleSection = () => (
  <div className="flex gap-24 mb-24">
    <RevenueOverview />
    <TopHotels />
  </div>
);
