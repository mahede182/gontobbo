import { prisma } from "../../config/database";
import { AppError } from "../../utils/appError";
import type { AddPaymentMethodInput } from "./payments.schema";

export async function getPaymentMethods(userId: string) {
  return prisma.paymentMethod.findMany({
    where: { userId },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });
}

export async function addPaymentMethod(userId: string, input: AddPaymentMethodInput) {
  // If setting as default, unset other defaults
  if (input.isDefault) {
    await prisma.paymentMethod.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });
  }

  return prisma.paymentMethod.create({
    data: {
      userId,
      type: input.type,
      name: input.name,
      last4: input.last4,
      isDefault: input.isDefault || false,
    },
  });
}

export async function removePaymentMethod(id: string, userId: string) {
  const method = await prisma.paymentMethod.findUnique({ where: { id } });
  if (!method) throw AppError.notFound("Payment method not found");
  if (method.userId !== userId) throw AppError.forbidden("Access denied");

  await prisma.paymentMethod.delete({ where: { id } });
}
