import { apiReturn } from "~/utils/apiReturn";
import { makeApiFunction } from "~/utils/makeApi.server";
import { createAgent } from "~/lib/data/postgres/dbApi.server";
import { createAgentSchema } from "~/lib/data/postgres/agentSchema.server";
import { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const _createAgent = async () => {
    const formData = await request.formData();
    const agent = createAgentSchema.parse(Object.fromEntries(formData));
    const newAgent = await createAgent(agent);
    return newAgent;
  };
  return apiReturn(await makeApiFunction(request, _createAgent)());
};
