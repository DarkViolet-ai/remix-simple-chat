import { z } from "zod";
import { v4 as uuid } from "uuid";

export const entityNodeSchema = z.object({
  id: z.string(),
  entityId: z.string(),
  systemPrompt: z.string().optional().nullable(),
  lastFeedbackTimestamp: z.date().optional().nullable(),
  lastOutputTimestamp: z.date().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createEntityNodeSchema = entityNodeSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    initialFeedback: z.string().optional(),
  });

export type CreateEntityNodeInput = z.input<typeof createEntityNodeSchema>;

export type EntityNode = z.infer<typeof entityNodeSchema>;

export const updateEntityNodeSchema = entityNodeSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    id: z.string(),
  });

export type UpdateEntityNodeInput = z.input<typeof updateEntityNodeSchema>;

export const entityNodeFromDbSchema = entityNodeSchema.extend({
  id: z.string(),
  entityId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type EntityNodeFromDb = z.infer<typeof entityNodeFromDbSchema>;
