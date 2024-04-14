import { ClientOnly } from "remix-utils/client-only";

export default function ChartWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientOnly fallback={<div>Loading...</div>}>{() => children}</ClientOnly>
  );
}
