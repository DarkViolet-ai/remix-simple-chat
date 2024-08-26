import { z } from "zod";
import { Role } from "@prisma/client";
import { chatFromDbSchema, chatSchema } from "./chatSchema.server";

/**
 * model User {
  id           String    @id @default(cuid())
  email        String    @unique
  name         String    @unique
  passwordHash String
  created      DateTime  @default(now())
  updated      DateTime  @updatedAt
  provider     String?
  lastLogin    DateTime?
  role         Role      @default(user)
  imageId      String?
  imageUrl     String?
  chats        Chat[]
}
 */

export const userSchema = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  passwordHash: z.string(),
  created: z.date().optional(),
  updated: z.date().optional(),
  provider: z.string().optional(),
  lastLogin: z.date().optional(),
  role: z.nativeEnum(Role).optional(),
  imageId: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const createUserSchema = userSchema
  .omit({
    id: true,
    created: true,
    updated: true,
    passwordHash: true,
  })
  .extend({
    password: z.string(),
  });

export type CreateUserInput = z.input<typeof createUserSchema>;

export type User = z.infer<typeof userSchema>;

export const updateUserSchema = userSchema
  .omit({
    created: true,
    updated: true,
  })
  .extend({
    id: z.string(),
  });

export type UpdateUserInput = z.input<typeof updateUserSchema>;

export const userFromDbSchema = userSchema.extend({
  id: z.string(),
  created: z.date(),
  updated: z.date(),
  role: z.nativeEnum(Role),
});

export type UserFromDb = z.infer<typeof userFromDbSchema>;
