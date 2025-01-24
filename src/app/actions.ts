'use server'

import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai"
import { z } from "zod";


export async function suggestQuestions(history: any[]) {
    console.log(history)
    const { object } = await generateObject({
        model: openai("gpt-4o-mini"),
        temperature: 0,
        maxTokens: 300,
        topP: 0.3,
        topK: 7,
        system:
            `You are a search engine query/questions generator. You 'have' to create only '3' questions for the search engine based on the message history which has been provided to you.
    The questions should be open-ended and should encourage further discussion while maintaining the whole context. Limit it to 5-10 words per question.
    Always put the user input's context is some way so that the next search knows what to search for exactly.
    Try to stick to the context of the conversation and avoid asking questions that are too general or too specific.
    If topics are more stat based, try to ask questions about the statistics of the topic.
    Then also do not ask the same question twice.
    `,
        messages: history,
        schema: z.object({
            questions: z.array(z.string()).describe('The generated questions based on the message history.')
        }),
    });
    console.log(object.questions)
    return {
        questions: object.questions
    }
}