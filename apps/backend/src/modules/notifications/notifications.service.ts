import { prisma } from "../../config/database";
import { AppError } from "../../utils/appError";
import { paginationMeta } from "../../utils/apiResponse";

export async function getNotifications(userId: string, page: number = 1, limit: number = 20) {
  const [notifications, total] = await Promise.all([
    prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.notification.count({ where: { userId } }),
  ]);

  const unreadCount = await prisma.notification.count({
    where: { userId, isRead: false },
  });

  return {
    data: notifications,
    unreadCount,
    meta: paginationMeta(total, page, limit),
  };
}

export async function markAsRead(id: string, userId: string) {
  const notification = await prisma.notification.findUnique({ where: { id } });
  if (!notification) throw AppError.notFound("Notification not found");
  if (notification.userId !== userId) throw AppError.forbidden("Access denied");

  return prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
}

export async function markAllAsRead(userId: string) {
  await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
}
