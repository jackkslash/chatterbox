'use client';

import { useChat } from 'ai/react';
import React, { useState } from 'react'
import { Trending } from './Trending';
import { suggestQuestions } from '../actions';

export const Chat = () => {

    const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
    const { messages, input, handleInputChange, handleSubmit, append } = useChat({
        maxSteps: 5,
        onFinish: async (message, { finishReason }) => {
            if (message.content && finishReason === 'stop' || finishReason === 'length') {
                const newHistory = [...messages, { role: 'assistant', content: message.content }];
                const { questions } = await suggestQuestions(newHistory);
                setSuggestedQuestions(questions);
                console.log(suggestedQuestions);
            }
        }

    });
    return (
        <div>
            <div className="flex flex-col w-full max-w-xl py-24 mx-auto stretch gap-4">
                <div className="flex flex-col gap-4 h-96 overflow-y-auto" ref={(el) => {
                    if (el) {
                        el.scrollTop = el.scrollHeight;
                    }
                }}>
                    {messages.map(m => (
                        <div key={m.id} className="whitespace-pre-wrap">
                            {m.role === 'user' ? 'User: ' : 'AI: '}
                            {m.toolInvocations ? (
                                <pre>{JSON.stringify(m.toolInvocations, null, 2)}</pre>
                            ) : (
                                <p>{m.content}</p>
                            )}
                        </div>
                    ))}
                    {suggestedQuestions.length > 0 && (
                        <div className="flex flex-col gap-4">
                            <h2 className="text-lg font-bold">Suggested Questions</h2>
                            <ul className="list-disc list-inside">
                                {suggestedQuestions.map((q, i) => (
                                    <li key={i} onClick={() => {
                                        append({ role: 'user', content: q });
                                        setSuggestedQuestions([]);
                                    }}>
                                        {q}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>



                <form onSubmit={handleSubmit} className="flex justify-center">
                    <input
                        className="w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
                        value={input}
                        placeholder="Say something..."
                        onChange={handleInputChange}
                    />
                </form>
            </div>
            <Trending append={append} />
        </div>
    )
}
