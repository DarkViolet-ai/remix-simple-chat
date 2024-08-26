import { z } from "zod";
import { createEntityNodeSchema, entityNodeSchema } from "./nodeSchema.server";
import { createEntityEdgeSchema, entityEdgeSchema } from "./edgeSchema.server";

/**
 * model Entity {
  id          String       @id @default(cuid())
  name        String
  description String?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  nodes       entityNode[]
  edges       entityEdge[]
}
 */

export const entitySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createEntitySchema = entitySchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    nodes: z.array(createEntityNodeSchema.omit({ entityId: true })),
    edges: z.array(createEntityEdgeSchema.omit({ entityId: true })),
  });

export type CreateEntityInput = z.input<typeof createEntitySchema>;

export type Entity = z.infer<typeof entitySchema>;

export const updateEntitySchema = entitySchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type UpdateEntityInput = z.input<typeof updateEntitySchema>;

export const entityFromDbSchema = entitySchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  nodes: z.array(entityNodeSchema),
  edges: z.array(entityEdgeSchema),
});

export type EntityFromDb = z.infer<typeof entityFromDbSchema>;
