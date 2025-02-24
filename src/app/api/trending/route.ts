import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

export interface TrendingQuery {
    icon: string;
    text: string;
    category: string;
}

async function getTrending(): Promise<TrendingQuery[]> {
    const response = await fetch('https://trends.google.com/trending/rss');

    if (!response.ok) {
        throw new Error('Failed to fetch trending');
    }

    const feed = await response.text();
    const items = feed.match(/<title>(?!Daily Search Trends)(.*?)<\/title>/g);
    // const items = feed.match(/<title>(?!Daily Search Trends)(.*?)<\/title>/g)?.slice(0, 2);

    const categories = ['trending', 'community', 'science', 'tech', 'travel', 'politics', 'health', 'sports', 'finance', 'football'] as const;

    const schema = z.object({
        category: z.enum(categories),
    });

    const itemObject = await Promise.all(items!.map(async (item) => {
        const { object } = await generateObject({
            model: openai('gpt-4o-mini'),
            prompt: `Give the category for the topic from the existing values only in lowercase only: ${item.replace(/<\/?title>/g, '')}
          
          - if the topic category isn't present in the list, please select 'trending' only!`,
            schema,
            temperature: 0,
        });
        return {
            icon: object.category,
            text: item.replace(/<\/?title>/g, ''),
            category: object.category,
        }
    }));

    return itemObject;
}
export async function GET() {
    try {
        const trending = await getTrending();
        console.log(trending);
        return new Response(JSON.stringify(trending));
    } catch (e) {
        console.error(e);
        return NextResponse.json([
            {
                icon: 'globe',
                text: "Current weather in London",
                category: 'science'
            },
            {
                icon: 'code',
                text: "Explain AI agaents",
                category: 'tech'
            },
            {
                icon: 'globe',
                text: "Top travel destinations in 2025",
                category: 'travel'
            }
        ]);
    }
}