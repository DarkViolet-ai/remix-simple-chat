import { remember } from "@epic-web/remember";
import type { Redis as RedisType } from "ioredis";
import Redis from "ioredis";
import { createClient } from "redis";

const redis = remember("redis", () => {
  return new Redis(process.env.REDIS_URL as string, { family: 6 });
});

const redisVectorClient = remember("redisVectorClient", () => {
  const client = createClient({
    url: process.env.REDIS_URL,
    socket: { family: 6 },
  });
  client.connect();
  return client;
});

export { redis, redisVectorClient };
