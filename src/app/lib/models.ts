import { openai } from "@ai-sdk/openai";
import { google } from '@ai-sdk/google'
import { LanguageModelV1 } from "ai";

export const models: Record<string, LanguageModelV1> = {
    'gpt-4o-mini': openai('gpt-4o-mini'),
    'o3-mini': openai('o3-mini'),
    'gemini-2.0-flash': google('gemini-2.0-flash-001'),
    'gemini-2.0-flash-lite': google('gemini-2.0-flash-lite-preview-02-05'),
}