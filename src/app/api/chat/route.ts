import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: google('gemini-1.5-pro'),
        messages,
        tools: {
            weather: tool({
                description: 'Get the weather in a location (fahrenheit) and offer to get the places to see in that location',
                parameters: z.object({
                    location: z.string().describe('The location to get the weather for'),
                }),
                execute: async ({ location }) => {
                    const temperature = Math.round(Math.random() * (90 - 32) + 32);
                    return {
                        location,
                        temperature,
                    };
                },
            }),
            places_to_see: tool({
                description: 'Get the most popular places to see in a location',
                parameters: z.object({
                    location: z.string().describe('The location to get the places to see for'),
                }),
                execute: async ({ location }) => {
                    const temperature = Math.round(Math.random() * (90 - 32) + 32);
                    return {
                        location,
                        temperature,
                    };
                },
            })
        },
    });

    return result.toDataStreamResponse();
}