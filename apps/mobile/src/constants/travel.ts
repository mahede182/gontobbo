import { TravelDocument } from "@/@types/profile.type";

export const TRAVEL_DOCUMENTS: TravelDocument[] = [
  {
    id: "1",
    type: "PASSPORT",
    name: "Passport",
    expiryDate: new Date("2025-12-31"),
    isRequired: true,
    description: "International passport with at least 6 months validity",
    status: "VALID",
  },
  {
    id: "2",
    type: "VISA",
    name: "Tourist Visa",
    isRequired: true,
    description: "Required for entry into destination country",
    status: "MISSING",
  },
  {
    id: "3",
    type: "INSURANCE",
    name: "Travel Insurance",
    expiryDate: new Date("2023-12-31"),
    isRequired: true,
    description: "International travel health insurance",
    status: "EXPIRED",
  },
  {
    id: "4",
    type: "VACCINATION",
    name: "COVID-19 Vaccination",
    isRequired: false,
    description: "Not mandatory but recommended",
    status: "NOT_ALLOWED",
  },
];
