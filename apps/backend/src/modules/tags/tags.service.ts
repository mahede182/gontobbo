import { prisma } from "../../config/database";

export async function getTags() {
  return prisma.tag.findMany({
    where: { active: true },
    orderBy: { label: "asc" },
  });
}
