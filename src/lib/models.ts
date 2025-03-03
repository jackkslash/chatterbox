import { openai } from "@ai-sdk/openai";
import { google } from '@ai-sdk/google'
import { LanguageModelV1 } from "ai";

export enum ModelId {
    GPT4O_MINI = 'gpt-4o-mini',
    TEST = 'test',
    O3_MINI = 'o3-mini',
    GEMINI_2_0_FLASH = 'gemini-2.0-flash',
    GEMINI_2_0_FLASH_LITE = 'gemini-2.0-flash-lite',
}

export interface ModelOption {
    id: ModelId;
    label: string;
    enabled: boolean; //backend feature flag
    active: boolean; //frontend user selection
    default?: boolean;
    provider: 'OpenAI' | 'Google' | 'Anthropic';
    features: {
        reasoning: boolean;
        imageInput: boolean;
    };
    description: string;
}

export const modelOptions: ModelOption[] = [
    {
        id: ModelId.GPT4O_MINI,
        label: 'GPT-4o Mini',
        enabled: true,
        active: false,
        provider: 'OpenAI',
        features: {
            reasoning: false,
            imageInput: false

        },
        description: 'A lightweight version of GPT-4, optimized for speed and efficiency'
    },
    {
        id: ModelId.TEST,
        label: 'TEST',
        enabled: true,
        active: true,
        provider: 'OpenAI',
        features: {
            reasoning: false,
            imageInput: false

        },
        description: 'A lightweight version of GPT-4, optimized for speed and efficiency'
    },
    {
        id: ModelId.O3_MINI,
        label: 'o3-mini',
        enabled: false,
        active: true,
        provider: 'OpenAI',
        features: {
            reasoning: true,
            imageInput: false
        },
        description: 'Compact model focused on general language tasks'
    },
    {
        id: ModelId.GEMINI_2_0_FLASH,
        label: 'Gemini 2.0 Flash',
        enabled: true,
        active: true,
        default: true,
        provider: 'Google',
        features: {
            reasoning: false,
            imageInput: true
        },
        description: 'Google\'s latest Gemini model optimized for fast responses'
    },
    {
        id: ModelId.GEMINI_2_0_FLASH_LITE,
        label: 'Gemini 2.0 Flash Lite Preview',
        enabled: true,
        active: false,
        provider: 'Google',
        features: {
            reasoning: false,
            imageInput: true
        },
        description: 'Lightweight version of Gemini 2.0 Flash'
    }
]

export const models: Record<ModelId, LanguageModelV1> = {
    [ModelId.TEST]: openai('test'),
    [ModelId.GPT4O_MINI]: openai('gpt-4o-mini'),
    [ModelId.O3_MINI]: openai('o3-mini'),
    [ModelId.GEMINI_2_0_FLASH]: google('gemini-2.0-flash-001'),
    [ModelId.GEMINI_2_0_FLASH_LITE]: google('gemini-2.0-flash-lite-preview-02-05'),
}

