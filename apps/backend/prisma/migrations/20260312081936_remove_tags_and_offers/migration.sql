/*
  Warnings:

  - You are about to drop the column `offerId` on the `wishlist_items` table. All the data in the column will be lost.
  - You are about to drop the `offers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "wishlist_items" DROP CONSTRAINT "wishlist_items_offerId_fkey";

-- AlterTable
ALTER TABLE "wishlist_items" DROP COLUMN "offerId";

-- DropTable
DROP TABLE "offers";

-- DropTable
DROP TABLE "tags";
