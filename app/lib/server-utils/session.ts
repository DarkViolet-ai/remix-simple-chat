import { createCookie, redirect } from "@remix-run/node";
import { v4 as uuid } from "uuid";

let secret = process.env.COOKIE_SECRET || "default";
if (secret === "default") {
  console.warn(
    "🚨 No COOKIE_SECRET environment variable set, using default. The app is insecure in production."
  );
  secret = "default-secret";
}

let cookie = createCookie("session", {
  secrets: [secret],
  // 30 days
  maxAge: 30 * 24 * 60 * 60,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
});

export async function getSessionIdFromRequest(
  request: Request
): Promise<string | null> {
  let sessionId = await cookie.parse(request.headers.get("Cookie"));
  console.log("session id in cookie", sessionId);
  return sessionId ?? null;
}

export async function setSessionIdOnResponse(
  response: Response,
  sessionId: string
): Promise<Response> {
  let header = await cookie.serialize(sessionId);
  response.headers.append("Set-Cookie", header);
  return response;
}

export async function redirectWithClearedCookie(): Promise<Response> {
  return redirect("/home", {
    headers: {
      "Set-Cookie": await cookie.serialize(null, {
        expires: new Date(0),
      }),
    },
  });
}
