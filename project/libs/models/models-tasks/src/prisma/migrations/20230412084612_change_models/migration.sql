/*
  Warnings:

  - You are about to drop the column `myTaskId` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `status` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_myTaskId_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "myTaskId",
ADD COLUMN     "my_task_id" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_my_task_id_fkey" FOREIGN KEY ("my_task_id") REFERENCES "myTasks"("my_task_id") ON DELETE SET NULL ON UPDATE CASCADE;
