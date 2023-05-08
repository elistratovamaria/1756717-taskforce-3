-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "comments_amount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "replies_amount" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "City";

-- DropEnum
DROP TYPE "StatusTask";
