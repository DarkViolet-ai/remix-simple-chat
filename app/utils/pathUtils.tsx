import { useLocation, useNavigate } from "@remix-run/react";

export function GetCurrentPath() {
  const pathname = useLocation().pathname;
  return pathname;
}

export function GetFromLink() {
  const query = new URLSearchParams(useLocation().search);
  const fromLink = query.get("from");
  return fromLink;
}

export function NavigateToFrom() {
  const fromLink = GetFromLink();
  const navigate = useNavigate();
  return () => navigate(fromLink || "");
}
