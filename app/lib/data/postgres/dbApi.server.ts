import { Update } from "vite";
import {
  CreateChatMessageInput,
  UpdateChatMessageInput,
} from "./chatMessageSchema.server";
import { prisma } from "./prisma.server";
import { v4 as uuidv4 } from "uuid";
import {
  Chat,
  ChatFromDb,
  CreateChatInput,
  UpdateChatInput,
} from "./chatSchema.server";
import {
  CreateEntityNodeInput,
  UpdateEntityNodeInput,
} from "./nodeSchema.server";
import {
  CreateEntityEdgeInput,
  UpdateEntityEdgeInput,
} from "./edgeSchema.server";
import { CreateNodeMessageInput } from "./nodeMessageSchema.server";
import { NodeMessageType, Prisma } from "@prisma/client";
import {
  CreateEntityInput,
  EntityFromDb,
  UpdateEntityInput,
} from "./entitySchema.server";
import {
  CreateUserInput,
  UserFromDb,
  UpdateUserInput,
} from "./userSchema.server";
import bcrypt from "bcryptjs";
import { CreateAgentInput, UpdateAgentInput } from "./agentSchema.server";

export const createChatMessage = async (
  chatMessage: CreateChatMessageInput
) => {
  return await prisma.chatMessage.create({
    data: chatMessage,
  });
};

export const deleteChatMessage = async (chatMessageId: string) => {
  return await prisma.chatMessage.delete({
    where: { id: chatMessageId },
  });
};

export const getChatMessage = async (chatMessageId: string) => {
  return await prisma.chatMessage.findUnique({
    where: { id: chatMessageId },
  });
};

export const updateChatMessage = async (
  chatMessage: UpdateChatMessageInput
) => {
  return await prisma.chatMessage.update({
    where: { id: chatMessage.id },
    data: chatMessage,
  });
};

export const chatQuery = {
  include: {
    messages: {
      orderBy: {
        createdAt: Prisma.SortOrder.asc,
      },
    },
  },
};

export const createChat = async (chat: CreateChatInput) => {
  console.log(chat);
  return await prisma.chat.create({
    data: {
      ...chat,
    },
  });
};

export const deleteChat = async (chatId: string) => {
  return await prisma.chat.delete({
    where: { id: chatId },
  });
};

export const updateChat = async (chat: UpdateChatInput) => {
  return (await prisma.chat.update({
    where: { id: chat.id },
    data: chat,
  })) as Chat;
};

export const getChat = async (chatId: string): Promise<ChatFromDb> => {
  return (await prisma.chat.findUnique({
    where: { id: chatId },
    ...chatQuery,
  })) as ChatFromDb;
};

export const getEntityChat = async (entityId: string): Promise<ChatFromDb> => {
  return (await prisma.chat.findUnique({
    where: { entityId },
    ...chatQuery,
  })) as ChatFromDb;
};

export const createEntityNode = async (node: CreateEntityNodeInput) => {
  const { initialFeedback, ...rest } = node;
  const newNode = await prisma.entityNode.create({
    data: {
      ...rest,
    },
  });
  if (initialFeedback) {
    await createNodeMessage({
      nodeId: newNode.id,
      content: initialFeedback,
      messageType: NodeMessageType.feedback,
    });
  }
};

export const deleteEntityNode = async (nodeId: string) => {
  return await prisma.entityNode.delete({
    where: { id: nodeId },
  });
};

export const getEntityNode = async (nodeId: string) => {
  return await prisma.entityNode.findUnique({
    where: { id: nodeId },
  });
};

export const updateEntityNode = async (node: UpdateEntityNodeInput) => {
  return await prisma.entityNode.update({
    where: { id: node.id },
    data: node,
  });
};

export const createEntityEdge = async (edge: CreateEntityEdgeInput) => {
  return await prisma.entityEdge.create({
    data: edge,
  });
};

export const deleteEntityEdge = async (edgeId: string) => {
  return await prisma.entityEdge.delete({
    where: { id: edgeId },
  });
};

export const getEntityEdge = async (edgeId: string) => {
  return await prisma.entityEdge.findUnique({
    where: { id: edgeId },
  });
};

export const updateEntityEdge = async (edge: UpdateEntityEdgeInput) => {
  return await prisma.entityEdge.update({
    where: { id: edge.id },
    data: edge,
  });
};

const nodeInputQuery = {
  include: {
    source: {
      include: {
        messages: true,
      },
      connectionPrompt: true,
    },
  },
};

export type NodeInputData = Prisma.entityEdgeGetPayload<typeof nodeInputQuery>;

export const getAllNodeInputs = async (
  nodeId: string
): Promise<NodeInputData[]> => {
  const node = await getEntityNode(nodeId);
  if (!node) return [];
  const lastOutputTimestamp = node?.lastOutputTimestamp;
  const result = await prisma.entityEdge.findMany({
    where: { targetId: nodeId },
    select: {
      source: {
        include: {
          messages: {
            where: {
              messageType: NodeMessageType.output,
              createdAt: {
                gte: lastOutputTimestamp || new Date(0),
              },
            },
          },
        },
      },
      connectionPrompt: true,
    },
  });
  return result as NodeInputData[];
};

export const createNodeMessage = async (
  nodeMessage: CreateNodeMessageInput
) => {
  try {
    return await prisma.nodeMessage.create({
      data: {
        ...nodeMessage,
      },
    });
  } catch (e) {
    console.log(e);
    console.log(nodeMessage);
  }
};

export const getNodeMessages = async (nodeId: string) => {
  return await prisma.nodeMessage.findMany({
    where: { nodeId },
    orderBy: { createdAt: "asc" },
  });
};

export const getLatestNodeMessageForType = async (
  nodeId: string,
  messageType: NodeMessageType
) => {
  return await prisma.nodeMessage.findFirst({
    where: { nodeId, messageType },
    orderBy: { createdAt: "desc" },
  });
};

export const createEntity = async (entity: CreateEntityInput) => {
  const { nodes, edges, ...entityData } = entity;

  const newEntity = await prisma.entity.create({
    data: {
      ...entityData,
    },
  });

  await Promise.all(
    nodes.map(async (node) => {
      console.log("creating node", node);
      await createEntityNode({
        ...node,
        entityId: newEntity.id,
      });
    })
  );

  await Promise.all(
    edges.map(async (edge) => {
      await createEntityEdge({
        ...edge,
        entityId: newEntity.id,
      });
    })
  );
  return newEntity;
};

export const getEntity = async (entityId: string): Promise<EntityFromDb> => {
  return (await prisma.entity.findUnique({
    where: { id: entityId },
    include: {
      nodes: true,
      edges: true,
    },
  })) as EntityFromDb;
};

export const updateEntity = async (entity: UpdateEntityInput) => {
  return await prisma.entity.update({
    where: { id: entity.id },
    data: entity,
  });
};

export const deleteEntity = async (entityId: string) =>
  await prisma.entity.delete({ where: { id: entityId } });

export const createUser = async (user: CreateUserInput) => {
  const { password, ...rest } = user;
  const passwordHash = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: { ...rest, passwordHash },
  });
};

export const getUser = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

export const updateUser = async (user: UpdateUserInput) => {
  return (await prisma.user.update({
    where: { id: user.id },
    data: user,
  })) as UserFromDb;
};

export const deleteUser = async (userId: string) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};

export const createAgent = async (agent: CreateAgentInput) => {
  return await prisma.agent.create({
    data: agent,
  });
};

export const getAgent = async (agentName: string) => {
  return await prisma.agent.findUnique({ where: { name: agentName } });
};

export const updateAgent = async (agent: UpdateAgentInput) => {
  return await prisma.agent.update({
    where: { id: agent.id },
    data: agent,
  });
};

export const deleteAgent = async (agentName: string) => {
  return await prisma.agent.delete({ where: { name: agentName } });
};
