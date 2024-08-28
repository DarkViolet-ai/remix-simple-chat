import { z } from "zod";
import { chatSchema } from "./chatSchema.server";

export const agentSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  model: z.string(),
  systemPrompt: z.string(),
  tools: z.array(z.string()).optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createAgentSchema = agentSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    tools: z.array(z.string()).optional(),
  });

export type CreateAgentInput = z.input<typeof createAgentSchema>;

export type Agent = z.infer<typeof agentSchema>;

export const updateAgentSchema = agentSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    tools: z.array(z.string()).optional(),
    id: z.string(),
  });

export type UpdateAgentInput = z.input<typeof updateAgentSchema>;
