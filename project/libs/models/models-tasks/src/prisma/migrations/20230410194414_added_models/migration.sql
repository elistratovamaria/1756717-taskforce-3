/*
  Warnings:

  - You are about to drop the column `response_id` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "message" SET DEFAULT '';

-- AlterTable
ALTER TABLE "responses" ALTER COLUMN "message" SET DEFAULT '';

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "response_id";
