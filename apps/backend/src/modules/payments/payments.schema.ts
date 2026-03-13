import { PaymentType } from "@prisma/client";
import { z } from "zod";

export const addPaymentMethodSchema = z.object({
  type: z.nativeEnum(PaymentType),
  name: z.string().min(1, "Name is required"),
  last4: z.string().length(4).optional(),
  isDefault: z.boolean().optional(),
});

export type AddPaymentMethodInput = z.infer<typeof addPaymentMethodSchema>;
