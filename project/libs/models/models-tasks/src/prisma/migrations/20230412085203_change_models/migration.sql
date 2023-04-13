/*
  Warnings:

  - Changed the type of `city` on the `tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "City" AS ENUM ('Moscow', 'SaintPetersburg', 'Vladivostok');

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "city",
ADD COLUMN     "city" "City" NOT NULL;
