import { z } from "zod";
import { ChatRole } from "@prisma/client";

/**
 *model ChatMessage {
  id                String   @id @default(cuid())
  chatId            String
  chat              Chat     @relation(fields: [chatId], references: [id])
  name              String?
  role              ChatRole @default(user)
  content           String
  additional_kwargs Json?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
 */

export const chatMessageSchema = z.object({
  id: z.string().optional(),
  chatId: z.string(),
  name: z.string().optional(),
  role: z.nativeEnum(ChatRole),
  content: z.string(),
  createdAt: z.date().optional(),
});

export const createChatMessageSchema = chatMessageSchema.omit({
  id: true,
  createdAt: true,
});

export type CreateChatMessageInput = z.input<typeof createChatMessageSchema>;

export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const updateChatMessageSchema = chatMessageSchema
  .omit({
    createdAt: true,
  })
  .extend({
    id: z.string(),
  });

export type UpdateChatMessageInput = z.input<typeof updateChatMessageSchema>;

export const chatMessageFromDbSchema = chatMessageSchema.extend({
  id: z.string(),
  createdAt: z.date(),
});

export type ChatMessageFromDb = z.infer<typeof chatMessageFromDbSchema>;
