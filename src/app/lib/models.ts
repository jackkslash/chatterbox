import { openai } from "@ai-sdk/openai";
import { google } from '@ai-sdk/google'
import { LanguageModelV1 } from "ai";

export enum ModelId {
    GPT4O_MINI = 'gpt-4o-mini',
    O3_MINI = 'o3-mini',
    GEMINI_2_0_FLASH = 'gemini-2.0-flash',
    GEMINI_2_0_FLASH_LITE = 'gemini-2.0-flash-lite',
}

export interface ModelOption {
    id: ModelId;
    label: string;
    active: boolean;
}

export const modelOptions: ModelOption[] = [
    { id: ModelId.GPT4O_MINI, label: 'GPT-4o Mini', active: true },
    { id: ModelId.O3_MINI, label: 'o3-mini', active: false },
    { id: ModelId.GEMINI_2_0_FLASH, label: 'Gemini 2.0 Flash', active: true },
    { id: ModelId.GEMINI_2_0_FLASH_LITE, label: 'Gemini 2.0 Flash Lite Preview', active: true },
]

export const models: Record<ModelId, LanguageModelV1> = {
    [ModelId.GPT4O_MINI]: openai('gpt-4o-mini'),
    [ModelId.O3_MINI]: openai('o3-mini'),
    [ModelId.GEMINI_2_0_FLASH]: google('gemini-2.0-flash-001'),
    [ModelId.GEMINI_2_0_FLASH_LITE]: google('gemini-2.0-flash-lite-preview-02-05'),
}

