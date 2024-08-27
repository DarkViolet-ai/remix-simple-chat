import { z } from "zod";
import {
  chatMessageFromDbSchema,
  chatMessageSchema,
} from "./chatMessageSchema.server";
/**
 * model Chat {
  id         String          @id @default(cuid())
  createdAt  DateTime        @default(now())
  lastActive DateTime        @updatedAt
  user       User?           @relation(fields: [userId], references: [id], onDelete: SetNull)
  userId     String?
  title      String?
  titleSet   TitleSetOptions @default(auto)
  isPrivate  Boolean         @default(false)
  messages   ChatMessage[]
}
 */

export const chatSchema = z.object({
  id: z.string().optional(),
  username: z.string().optional(),
  entityId: z.string().optional(),
  agentId: z.string().optional(),
  title: z.string().optional(),
  titleSet: z.enum(["auto", "locked"]).optional(),
  isPrivate: z.boolean().optional(),
  messages: z.array(chatMessageSchema).optional(),
  createdAt: z.date().optional(),
  lastActive: z.date().optional(),
});

export const createChatSchema = chatSchema.omit({
  createdAt: true,
  lastActive: true,
  messages: true,
});

export type CreateChatInput = z.input<typeof createChatSchema>;

export type Chat = z.infer<typeof chatSchema>;

export const updateChatSchema = chatSchema
  .omit({
    createdAt: true,
    messages: true,
  })
  .extend({
    id: z.string(),
  });

export type UpdateChatInput = z.input<typeof updateChatSchema>;

export const chatFromDbSchema = chatSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  lastActive: z.date(),
  messages: z.array(chatMessageFromDbSchema),
});

export type ChatFromDb = z.infer<typeof chatFromDbSchema>;
