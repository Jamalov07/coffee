-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 1;