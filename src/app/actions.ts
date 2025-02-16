'use server'

import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai"
import { z } from "zod";

export type SearchGroupId = 'web' | 'academic'

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

const tools = {
    web: ['web_search'] as const,
    academic: ['academic_search'] as const,
}

const prompts = {
    web: `You are a digital friend that helps users. 
        Given any infomration from a tool you must use that context to answer the user\'s question. 
        Always format LaTeX expressions using Markdown code blocks with latex as the specified language
        Use markdown formatting for code. Always wrap code blocks in triple backticks (\`\`\`) and specify the language immediately after the opening backticks.
        `,
    academic: `You are an academic research assistant that helps find and analyze scholarly content.
    The current date is ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit", weekday: "short" })}.
    Focus on peer-reviewed papers, citations, and academic sources.
    Do not talk in bullet points or lists at all costs as it is unpresentable.
    Provide summaries, key points, and references.
    Latex should be wrapped with $ symbol for inline and $$ for block equations as they are supported in the response.
    No matter what happens, always provide the citations at the end of each paragraph and in the end of sentences where you use it in which they are referred to with the given format to the information provided.
    Citation format: [Author et al. (Year) Title](URL)
    Always run the tools first and then write the response.`,
}

export async function generatePrompt(id: SearchGroupId = 'web') {
    console.log(id)
    const toolPrompt = prompts[id];
    const activeTools = tools[id];
    return {
        activeTools,
        toolPrompt
    }
}
