import { PaymentMethod } from "@/@types/api.type";
import { images } from "@/theme/images";

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 1, name: "Credit/Debit Card", icon: images.creditCard, type: "Card" },
  { id: 2, name: "PayPal", icon: images.applePay, type: "Wallet" },
  { id: 3, name: "Master Card", icon: images.creditCard, type: "Card" },
  { id: 4, name: "Bkash", icon: images.applePay, type: "Mobile" },
];
