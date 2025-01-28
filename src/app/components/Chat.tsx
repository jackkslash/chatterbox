'use client';

import { useChat } from 'ai/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Trending } from './Trending';
import { suggestQuestions } from '../actions';
import ReactMarkdown from 'react-markdown';
import { ToolInvocations } from './ToolInvocations';

export const Chat = () => {
    const lastSubmittedQueryRef = useRef<string>('');
    const [submitted, setSubmitted] = useState(false);
    const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
    const { messages, input, handleInputChange, handleSubmit, append } = useChat({
        maxSteps: 5,
        onFinish: async (message, { finishReason }) => {
            if (message.content && finishReason === 'stop' || finishReason === 'length') {
                const newHistory = [...messages, { role: "user", content: lastSubmittedQueryRef.current }, { role: "assistant", content: message.content }];
                const { questions } = await suggestQuestions(newHistory);
                setSuggestedQuestions(questions);
                console.log(suggestedQuestions);
            }
        }

    });


    useEffect(() => {
        if (messages.length) {
            setSubmitted(true);
        }
    }, [messages.length]);
    const memoMessages = useMemo(() => messages, [messages]);
    const memoAppend = useCallback(append, [append]);

    return (
        <div>
            <div className="flex flex-col w-full max-w-xl py-24 mx-auto stretch gap-4">
                {(!submitted &&
                    <div>
                        <h1>Ask summet?</h1>
                    </div>
                )}
                <div className="flex flex-col gap-4 h-96 overflow-y-auto" ref={(el) => {
                    if (el) {
                        el.scrollTop = el.scrollHeight;
                    }
                }}>
                    {memoMessages.map(m => (
                        <div key={m.id} className="whitespace-pre-wrap">
                            {m.role === 'user' ? 'User: ' : 'AI: '}
                            {m.toolInvocations && (
                                <div className="flex flex-col gap-2">
                                    <ToolInvocations toolInvocations={m.toolInvocations} />
                                </div>
                            )}
                            {m.content && (
                                <ReactMarkdown>{m.content}</ReactMarkdown>
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
                                        lastSubmittedQueryRef.current = q;
                                        setSuggestedQuestions([]);
                                        setSubmitted(true);
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
            <Trending append={memoAppend} setSubmitted={setSubmitted} />
        </div>
    )
}
