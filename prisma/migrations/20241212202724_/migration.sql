/*
  Warnings:

  - Added the required column `description` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "open" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "description" TEXT NOT NULL;