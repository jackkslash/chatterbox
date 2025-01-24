import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

async function getTrending() {
    const response = await fetch('https://trends.google.com/trends/trendingsearches/daily/rss');

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
                icon: 'sparkles',
                text: "What causes the Northern Lights?",
                category: 'science'
            },
            {
                icon: 'code',
                text: "Explain quantum computing",
                category: 'tech'
            },
            {
                icon: 'globe',
                text: "Most beautiful places in Japan",
                category: 'travel'
            }
        ]);
    }
}