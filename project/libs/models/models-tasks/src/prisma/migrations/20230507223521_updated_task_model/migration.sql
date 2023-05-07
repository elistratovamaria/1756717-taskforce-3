/*
  Warnings:

  - You are about to drop the column `comments_amount` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `replies_amount` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "comments_amount",
DROP COLUMN "replies_amount";
