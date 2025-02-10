import { generateText, streamText, tool } from 'ai';
import { z } from 'zod';
import { tavily } from '@tavily/core';
import { generatePrompt, SearchGroupId } from '@/app/actions';
import { models } from '@/app/lib/models';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages, model, group }: { messages: [], model: keyof typeof models, group: SearchGroupId } = await req.json();
    const { activeTools, toolPrompt } = await generatePrompt(group);
    const result = streamText({
        model: models[model],
        system: toolPrompt,
        messages,
        experimental_activeTools: [...activeTools],
        tools: {
            web_search: tool({
                description: "Search the web for information with multiple queries, max results and search depth.",
                parameters: z.object({
                    queries: z.array(z.string().describe("Array of search queries to look up on the web.")),
                    maxResults: z.array(z
                        .number()
                        .describe("Array of maximum number of results to return per query.").default(10)),
                }),
                execute: async ({
                    queries,
                    maxResults,
                }: {
                    queries: string[];
                    maxResults: number[];

                }) => {
                    const apiKey = process.env.TAVILY_API_KEY;
                    const tvly = tavily({ apiKey });

                    console.log("Queries:", queries);
                    console.log("Max Results:", maxResults);
                    // Execute searches in parallel
                    const searchPromises = queries.map(async (query, index) => {
                        const data = await tvly.search(query, {
                            days: 7,
                            maxResults: maxResults[index] || maxResults[0] || 10,
                            includeAnswer: true,
                        });
                        return {
                            query,
                            results: data.results.map((obj: any) => ({
                                url: obj.url,
                                title: obj.title,
                                content: obj.content,
                                raw_content: obj.raw_content,
                                published_date: obj.published_date,
                            })),
                        };
                    });

                    const searchResults = await Promise.all(searchPromises);
                    console.log(searchResults);
                    return {
                        searches: searchResults,
                    };
                },
            }),
        },
    });

    return result.toDataStreamResponse({
        sendReasoning: true,
    });
}
