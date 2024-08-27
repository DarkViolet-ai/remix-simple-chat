/*
  Warnings:

  - A unique constraint covering the columns `[agentId]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "agentId" TEXT;

-- CreateTable
CREATE TABLE "agent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "systemPrompt" TEXT,
    "tools" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agent_name_key" ON "agent"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_agentId_key" ON "Chat"("agentId");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "agent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
