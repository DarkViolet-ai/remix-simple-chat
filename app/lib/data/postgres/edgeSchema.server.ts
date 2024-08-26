import { z } from "zod";
/**
 * model entityEdge {
  id               String     @id @default(cuid())
  entity           Entity     @relation(fields: [entityId], references: [id])
  entityId         String
  source           entityNode @relation(name: "source", fields: [sourceId], references: [id], onDelete: Cascade)
  sourceId         String
  target           entityNode @relation(name: "target", fields: [targetId], references: [id], onDelete: Cascade)
  targetId         String
  connectionPrompt String?
  createdAt        DateTime   @default(now())
  updatedAt        DateTime   @updatedAt
}
 */

export const entityEdgeSchema = z.object({
  id: z.string().optional(),
  entityId: z.string(),
  sourceId: z.string(),
  targetId: z.string(),
  connectionPrompt: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createEntityEdgeSchema = entityEdgeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateEntityEdgeInput = z.input<typeof createEntityEdgeSchema>;

export type EntityEdge = z.infer<typeof entityEdgeSchema>;

export const updateEntityEdgeSchema = entityEdgeSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    id: z.string(),
  });

export type UpdateEntityEdgeInput = z.input<typeof updateEntityEdgeSchema>;

export const entityEdgeFromDbSchema = entityEdgeSchema.extend({
  id: z.string(),
  entityId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type EntityEdgeFromDb = z.infer<typeof entityEdgeFromDbSchema>;
