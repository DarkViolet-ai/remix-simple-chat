/*
  Warnings:

  - You are about to drop the column `agentId` on the `Chat` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[agentName]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_agentId_fkey";

-- DropIndex
DROP INDEX "Chat_agentId_key";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "agentId",
ADD COLUMN     "agentName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Chat_agentName_key" ON "Chat"("agentName");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_agentName_fkey" FOREIGN KEY ("agentName") REFERENCES "agent"("name") ON DELETE SET NULL ON UPDATE CASCADE;
