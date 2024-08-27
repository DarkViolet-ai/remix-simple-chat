import type { LoaderFunctionArgs } from "@remix-run/node";
import { eventStream } from "remix-utils/sse/server";
import { entityEvents } from "~/lib/server-utils/events.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { entityId } = params as { entityId: string };

  return eventStream(request.signal, (send) => {
    const { addListener, removeListener } =
      entityEvents.newEntityOutput(entityId);

    const listener = () => {
      send({ data: new Date().toISOString() });
    };

    addListener(listener);

    return () => {
      removeListener(listener);
    };
  });
};
