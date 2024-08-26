import { z } from "zod";
import { NodeMessageType } from "@prisma/client";

/**
 * model NodeMessage {
  id          String          @id @default(cuid())
  nodeId      String
  node        entityNode      @relation(fields: [nodeId], references: [id])
  content     String
  messageType NodeMessageType
  createdAt   DateTime        @default(now())
}
 */

export const nodeMessageSchema = z.object({
  id: z.string().optional(),
  nodeId: z.string(),
  content: z.string(),
  messageType: z.nativeEnum(NodeMessageType),
  createdAt: z.date().optional(),
});

export const createNodeMessageSchema = nodeMessageSchema.omit({
  id: true,
  createdAt: true,
});

export type CreateNodeMessageInput = z.input<typeof createNodeMessageSchema>;

export type NodeMessage = z.infer<typeof nodeMessageSchema>;

export const updateNodeMessageSchema = nodeMessageSchema
  .omit({
    createdAt: true,
  })
  .extend({
    id: z.string(),
  });

export type UpdateNodeMessageInput = z.input<typeof updateNodeMessageSchema>;

export const nodeMessageFromDbSchema = nodeMessageSchema.extend({
  id: z.string(),
  createdAt: z.date(),
});

export type NodeMessageFromDb = z.infer<typeof nodeMessageFromDbSchema>;
