/*
  Warnings:

  - You are about to drop the column `my_task_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the `myTasks` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `status` on the `tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatusTask" AS ENUM ('New', 'Cancelled', 'InProgress', 'Done', 'Failed');

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_my_task_id_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "my_task_id",
DROP COLUMN "status",
ADD COLUMN     "status" "StatusTask" NOT NULL;

-- DropTable
DROP TABLE "myTasks";
