import { apiReturn } from "~/utils/apiReturn";
import { makeApiFunction } from "~/utils/makeApi.server";
import { updateAgent, getAgent } from "~/lib/data/postgres/dbApi.server";
import { updateAgentSchema } from "~/lib/data/postgres/agentSchema.server";
import { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const _getAgent = async () => {
    const agentName = params.name as string;
    const agent = await getAgent(agentName);
    return agent;
  };
  return apiReturn(await makeApiFunction(request, _getAgent)());
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const _updateAgent = async () => {
    const formData = await request.formData();
    const agent = updateAgentSchema.parse(Object.fromEntries(formData));
    const updatedAgent = await updateAgent(agent);
    return updatedAgent;
  };
  return apiReturn(await makeApiFunction(request, _updateAgent)());
};
