'use client';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react';
import { Trending } from './Trending';
import { suggestQuestions } from '@/app/actions';
import { ToolInvocations } from './ToolInvocations';
import { MarkdownRender } from './MarkdownRender';
import { ChatForm } from './ChatForm';
import { Download } from 'lucide-react';
import { modelOptions } from '../lib/models';


export const Chat = () => {
    const lastSubmittedQueryRef = useRef<string>('');
    const [submitted, setSubmitted] = useState(false);
    const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState(() => {
        const defaultModel = modelOptions.find(m => m.default)?.id || modelOptions[0].id;
        return defaultModel;
    });
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
                const { questions } = await suggestQuestions(newHistory, selectedModel);
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

    const exportData = useMemo(() => {
        return () => {
            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                JSON.stringify(memoMessages, null, 2)
            )}`;
            const link = document.createElement("a");
            link.href = jsonString;
            link.download = "data.json";

            link.click();
        };
    }, [memoMessages]);


    return (
        <div className="max-w-3xl mx-auto">
            <div className={`pb-8 sm:pb-18 pt-20 max-w-xs sm:max-w-2xl  ${submitted ? 'md:min-w-[42rem]' : ''}`}>
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
                                {m.parts.map((part, i) => {
                                    switch (part.type) {
                                        case 'text':
                                            return <div key={i} className="text-zinc-50 ">
                                                <MarkdownRender content={part.text} />
                                            </div>
                                        case 'tool-invocation':
                                            return <ToolInvocations key={i} toolInvocations={[part.toolInvocation]} />
                                        default:
                                            return null;
                                    }
                                })}
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
                        <h1 className='text-2xl font-bold text-neutral-200 pb-8'>
                            Talk to me.
                        </h1>
                    </div>
                )}

                {submitted ? (<div className="fixed bottom-2 left-1 right-1 sm:p-2 z-50 mx-auto sm:max-w-2xl md:max-w-3xl bg-black/75 rounded-md">
                    <button disabled={isLoading}
                        onClick={exportData}
                        className="text-neutral-400 hover:text-white cursor-pointer p-1 mb-1 rounded-md hover:bg-neutral-800/70"
                    >
                        <Download size={16} />
                    </button>
                    <ChatForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} input={input} handleKeyPress={handleKeyPress} selectedGroup={selectedGroup} isLoading={isLoading} stop={stop} />
                </div>
                ) : (
                    <div className='flex flex-col gap-8 sm:min-w-[22rem] md:min-w-[42rem]'>
                        <ChatForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} input={input} handleKeyPress={handleKeyPress} setSelectedGroup={setSelectedGroup} submitted={submitted} selectedGroup={selectedGroup} setSelectedModel={setSelectedModel} selectedModel={selectedModel} />
                        {selectedGroup === 'web' && <Trending append={memoAppend} setSubmitted={setSubmitted} />}
                    </div>
                )}
            </div>
        </div >
    )
}
