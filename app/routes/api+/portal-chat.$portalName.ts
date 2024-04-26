import { portalChatAction } from "~/lib/actions/portalChatAction";
import { portalChatLoader } from "~/lib/loaders/portalChatLoader";
import type { ChatLoaderData } from "~/lib/loaders/portalChatLoader";

export type { ChatLoaderData };
export { portalChatLoader as loader, portalChatAction as action };
