import { useEffect, useState } from "react";
import {
  Agent,
  CreateAgentInput,
  UpdateAgentInput,
} from "../data/postgres/agentSchema.server";
import { useApiFetcher } from "./useApiFetcher";

export const useAgent = (name?: string) => {
  const fetcher = useApiFetcher<Agent>();
  const [_currentAgentName, setCurrentAgentName] = useState(name);
  const [revalidate, setRevalidate] = useState(false);

  const isLoading = fetcher.state !== "idle";
  const agent = fetcher.data?.data;
  const error = fetcher.data?.error;

  useEffect(() => {
    agent && setCurrentAgentName(agent.name);
  }, [agent?.name]);

  useEffect(() => {
    if (name && fetcher.state === "idle" && (!fetcher.data || revalidate)) {
      setRevalidate(false);
      fetcher.load(`/api/agent/${name}`);
    }
  }, [name, fetcher.state, revalidate, fetcher.data]);

  const updateAgent = (agent: CreateAgentInput | FormData) => {
    let agentName: string;
    if (agent instanceof FormData) {
      agentName = agent.get("name") as string;
    } else {
      agentName = agent.name;
    }
    fetcher.submit(agent, {
      method: "POST",
      action: `/api/agent/${agentName}`,
    });
  };

  const createAgent = (agent: UpdateAgentInput | FormData) => {
    fetcher.submit(agent, { method: "POST", action: "/api/agent/new" });
  };

  return {
    agent: agent,
    isLoading: isLoading,
    error: error,
    updateAgent: updateAgent,
    createAgent: createAgent,
  };
};
