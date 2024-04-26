import { useFetcher } from "@remix-run/react";

export enum GeneratorSources {
  OpenAI = "openai",
}

export const useImageGenerator = (source?: GeneratorSources) => {
  source = source || GeneratorSources.OpenAI;
  const fetcher = useFetcher<{
    data: { url: string; id: string };
    error: string | null;
  }>();
  const generateImage = async ({ prompt }: { prompt: string }) => {
    fetcher.submit(
      { prompt },
      { method: "post", action: `/api/image/generate/${source}` }
    );
  };
  console.log("fetcher data", fetcher.data);
  return {
    generateImage,
    imageData: fetcher.data,
    isSubmitting: fetcher.state === "submitting",
  };
};
