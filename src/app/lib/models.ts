import { openai } from "@ai-sdk/openai";
import { LanguageModelV1 } from "ai";

export const models: Record<string, LanguageModelV1> = {
    'gpt-4o-mini': openai('gpt-4o-mini'),
    'o1-mini': openai('o1-mini'),
}
