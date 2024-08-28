import { Form } from "@remix-run/react";
import { useAgent } from "~/lib/hooks/useAgent";

export default function NewAgent() {
  const { createAgent } = useAgent();
  return <Form onSubmit={createAgent}></Form>;
}
