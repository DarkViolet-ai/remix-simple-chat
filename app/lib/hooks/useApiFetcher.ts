import { useTypedFetcher } from "remix-typedjson";

export const useApiFetcher = <T>() => {
  return useTypedFetcher<{ data: T | null; error: string | null }>();
};
