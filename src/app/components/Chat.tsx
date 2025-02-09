'use client';

import { useChat } from 'ai/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Trending } from './Trending';
import { suggestQuestions } from '../actions';
import { ToolInvocations } from './ToolInvocations';
import { MarkdownRender } from './MarkdownRender';
import Link from 'next/link';
import { ModelSelector } from './ModelSelector';
import { ChatForm } from './ChatForm';


export const Chat = () => {
    const lastSubmittedQueryRef = useRef<string>('');
    const [submitted, setSubmitted] = useState(false);
    const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState('gpt-4o-mini');
    const [selectedGroup, setSelectedGroup] = useState('web');

    const { messages, input, handleInputChange, handleSubmit, append, isLoading, stop } = useChat({
        maxSteps: 5,
        body: {
            model: selectedModel,
            group: selectedGroup
        },
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
    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="fixed top-0 left-0 right-0 z-[60] flex justify-between items-center p-4 
    bg-neutral-950/30 backdrop-blur-lg border-b border-neutral-800/20">
                <div className="flex items-center gap-4 space-x-4">
                    <Link
                        href="/new"

                    >
                        <span className="font-bold tracking-tight">
                            CHATTERBOX
                        </span>
                    </Link>
                </div>
                <ModelSelector submitted={submitted} setSelectedModel={setSelectedModel} selectedModel={selectedModel} />
            </div>
            <div className={`pb-8 sm:pb-18 pt-20 max-w-xs sm:max-w-2xl  ${submitted ? 'min-w-96' : ''}`}>
                {submitted ? (
                    <div className="flex flex-col gap-4 sm:max-w-lg md:max-w-2xl " ref={(el) => {
                        if (el) {
                            el.scrollTop = el.scrollHeight;
                        }
                    }}>
                        {memoMessages.map((m, i) => (
                            <div key={i} className={`p-4 rounded-md 
                                ${m.role === 'user' ? 'bg-neutral-800/70 pt-3' : 'bg-neutral-900/70'}
                                border border-neutral-800/20`}>
                                <div className="text-sm font-medium text-neutral-400">
                                    {m.role === 'user' ? 'User' : selectedModel}
                                </div>
                                {m.toolInvocations && (
                                    <div className="flex flex-col gap-2">
                                        <ToolInvocations toolInvocations={m.toolInvocations} />
                                    </div>
                                )}
                                {m.content && (
                                    <div className="text-zinc-50 ">
                                        <MarkdownRender content={m.content} />
                                    </div>
                                )}

                            </div>

                        ))}
                        {suggestedQuestions.length > 0 && (
                            <div className="flex flex-col gap-4 p-3 mb-32 rounded-md bg-neutral-900/70 border border-neutral-800/20">
                                <h2 className="text-lg font-medium text-neutral-200">Suggested Questions</h2>
                                <ul className="flex flex-col gap-2">
                                    {suggestedQuestions.map((q, i) => (
                                        <li
                                            key={i}
                                            onClick={() => {
                                                append({ role: 'user', content: q });
                                                lastSubmittedQueryRef.current = q;
                                                setSuggestedQuestions([]);
                                                setSubmitted(true);
                                            }}
                                            className="text-neutral-400 hover:text-white cursor-pointer px-2 py-1 rounded-md hover:bg-neutral-800/70"
                                        >
                                            {q}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center gap-4'>
                        <h1 className='text-2xl font-bold text-neutral-200'>
                            Start a conversation
                        </h1>
                        <p className='text-neutral-400 text-center mb-4'>
                            Ask a question or start a discussion
                        </p>
                    </div>
                )}

                {submitted ? (<div className="fixed bottom-2 left-1 right-1 sm:p-2 z-50 mx-auto sm:max-w-2xl md:max-w-3xl bg-black/75 rounded-md">
                    <ChatForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} input={input} handleKeyPress={handleKeyPress} selectedGroup={selectedGroup} isLoading={isLoading} stop={stop} />
                </div>
                ) : (
                    <div className='flex flex-col gap-8'>
                        <ChatForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} input={input} handleKeyPress={handleKeyPress} setSelectedGroup={setSelectedGroup} selectedGroup={selectedGroup} />
                        <Trending append={memoAppend} setSubmitted={setSubmitted} />
                    </div>
                )}



            </div>

        </div >
    )
}
