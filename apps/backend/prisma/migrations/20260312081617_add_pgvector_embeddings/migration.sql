-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- AlterTable
ALTER TABLE "flights" ADD COLUMN     "embedding" vector(768);

-- AlterTable
ALTER TABLE "hotels" ADD COLUMN     "embedding" vector(768);

-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "embedding" vector(768);
