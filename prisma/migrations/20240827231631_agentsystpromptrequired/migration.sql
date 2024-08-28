/*
  Warnings:

  - Made the column `systemPrompt` on table `agent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "agent" ALTER COLUMN "systemPrompt" SET NOT NULL;
