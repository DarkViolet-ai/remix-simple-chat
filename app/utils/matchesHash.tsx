import { useLocation } from "@remix-run/react";

export default function MatchesHash({ linkName }: { linkName: string }) {
  const hash = useLocation().hash;
  return hash === linkName;
}
