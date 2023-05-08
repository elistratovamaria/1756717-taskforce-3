/*
  Warnings:

  - You are about to drop the `Reply` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_task_id_fkey";

-- DropTable
DROP TABLE "Reply";

-- CreateTable
CREATE TABLE "replies" (
    "reply_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "task_id" INTEGER NOT NULL,

    CONSTRAINT "replies_pkey" PRIMARY KEY ("reply_id")
);

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;
