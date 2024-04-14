import type { BaseChatModelParams } from "@langchain/core/language_models/chat_models";
import {
  type OpenAIClient,
  type ChatOpenAICallOptions,
  type OpenAIChatInput,
  type OpenAICoreRequestOptions,
  ChatOpenAI,
} from "@langchain/openai";
import { getEnvironmentVariable } from "@langchain/core/utils/env";

type DeepInfraUnsupportedArgs =
  | "frequencyPenalty"
  | "presencePenalty"
  | "logitBias"
  | "functions";

type DeepInfraUnsupportedCallOptions = "functions" | "function_call";

export interface ChatDeepInfraCallOptions
  extends Omit<ChatOpenAICallOptions, DeepInfraUnsupportedCallOptions> {
  response_format: {
    type: "json_object";
    schema: Record<string, unknown>;
  };
}

export interface ChatDeepInfraInput
  extends Omit<OpenAIChatInput, "openAIApiKey" | DeepInfraUnsupportedArgs>,
    BaseChatModelParams {
  /**
   * The TogetherAI API key to use for requests.
   * @default process.env.DEEP_INFRA_API_KEY
   */
  deepInfraApiKey?: string;
}

/**
 * Wrapper around Deep infra API for large language models fine-tuned for chat
 *
 * Deep Infra API is compatible to the OpenAI API with some limitations. View the
 * full API ref at:
 * @link {https://deepinfra.com/docs/advanced/openai_api}
 *
 * To use, you should have the `DEEP_INFRA_API_KEY` environment variable set.
 * @example
 * ```typescript
 * const model = new ChatDeepInfra({
 *   temperature: 0.9,
 *   deepInfraApiKey: process.env.DEEP_INFRA_API_KEY,
 * });
 *
 * const response = await model.invoke([new HumanMessage("Hello there!")]);
 * console.log(response);
 * ```
 */
export class ChatDeepInfra extends ChatOpenAI<ChatDeepInfraCallOptions> {
  static lc_name() {
    return "ChatDeepInfra";
  }

  _llmType() {
    return "deepInfra";
  }

  get lc_secrets(): { [key: string]: string } | undefined {
    return {
      deepInfraApiKey: "DEEP_INFRA_API_KEY",
    };
  }

  lc_serializable = true;

  constructor(
    fields?: Partial<
      Omit<OpenAIChatInput, "openAIApiKey" | DeepInfraUnsupportedArgs>
    > &
      BaseChatModelParams & { deepInfraApiKey?: string }
  ) {
    const deepInfraApiKey =
      fields?.deepInfraApiKey || getEnvironmentVariable("DEEP_INFRA_API_KEY");

    if (!deepInfraApiKey) {
      throw new Error(
        `Deep Infra API key not found. Please set the DEEP_INFRA_API_KEY environment variable or provide the key into "deepInfraApiKey"`
      );
    }

    super({
      ...fields,
      modelName: fields?.modelName || "mistralai/Mixtral-8x7B-Instruct-v0.1",
      openAIApiKey: deepInfraApiKey,
      configuration: {
        baseURL: "https://api.deepinfra.com/v1/openai/",
      },
    });
  }

  toJSON() {
    const result = super.toJSON();

    if (
      "kwargs" in result &&
      typeof result.kwargs === "object" &&
      result.kwargs != null
    ) {
      delete result.kwargs.openai_api_key;
      delete result.kwargs.configuration;
    }

    return result;
  }

  async completionWithRetry(
    request: OpenAIClient.Chat.ChatCompletionCreateParamsStreaming,
    options?: OpenAICoreRequestOptions
  ): Promise<AsyncIterable<OpenAIClient.Chat.Completions.ChatCompletionChunk>>;

  async completionWithRetry(
    request: OpenAIClient.Chat.ChatCompletionCreateParamsNonStreaming,
    options?: OpenAICoreRequestOptions
  ): Promise<OpenAIClient.Chat.Completions.ChatCompletion>;

  /**
   * Calls the TogetherAI API with retry logic in case of failures.
   * @param request The request to send to the TogetherAI API.
   * @param options Optional configuration for the API call.
   * @returns The response from the TogetherAI API.
   */
  async completionWithRetry(
    request:
      | OpenAIClient.Chat.ChatCompletionCreateParamsStreaming
      | OpenAIClient.Chat.ChatCompletionCreateParamsNonStreaming,
    options?: OpenAICoreRequestOptions
  ): Promise<
    | AsyncIterable<OpenAIClient.Chat.Completions.ChatCompletionChunk>
    | OpenAIClient.Chat.Completions.ChatCompletion
  > {
    delete request.frequency_penalty;
    delete request.presence_penalty;
    delete request.logit_bias;
    delete request.functions;

    if (request.stream === true) {
      return super.completionWithRetry(request, options);
    }

    const result = await super.completionWithRetry(request, options);
    console.log("result", JSON.stringify(result, null, 2));
    return result;
  }
}
