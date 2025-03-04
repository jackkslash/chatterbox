'use client';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react';
import { Trending } from './Trending';
import { suggestQuestions } from '@/app/actions';
import { ToolInvocations } from './ToolInvocations';
import { MarkdownRender } from './MarkdownRender';
import { ChatForm } from './ChatForm';
import { modelOptions } from '../lib/models';
import { ExportButton } from './ExportButton';
import { SuggestedQuestions } from './SuggestedQuestions';
import { ToolInvocation } from 'ai';

const ChatContent = ({
    messages, suggestedQuestions, memoAppend, setSubmitted, selectedModel
}: {
    messages: any[], suggestedQuestions: string[], memoAppend: Function, setSubmitted: Function, selectedModel: string
}) => {
    return (
        <div className="flex flex-col gap-4 sm:max-w-lg md:max-w-2xl " ref={(el) => {
            if (el) el.scrollTop = el.scrollHeight;
        }}>
            {messages.map((m, i) => (
                <div key={i} className={`p-4 rounded-md ${m.role === 'user' ? 'bg-neutral-800/70 pt-3' : 'bg-neutral-900/70'} border border-neutral-800/20`}>
                    <div className="text-sm font-medium text-neutral-400">
                        {m.role === 'user' ? 'User' : selectedModel}
                    </div>
                    {m.parts.map((part: { type: any; text: string; toolInvocation: ToolInvocation; }, i: React.Key | null | undefined) => {
                        switch (part.type) {
                            case 'text':
                                return <div key={i} className="text-zinc-50 "><MarkdownRender content={part.text} /></div>;
                            case 'tool-invocation':
                                return <ToolInvocations key={i} toolInvocations={[part.toolInvocation]} />;
                            default:
                                return null;
                        }
                    })}
                </div>
            ))}
            <SuggestedQuestions suggestedQuestions={suggestedQuestions} append={memoAppend} setSubmitted={setSubmitted} />
        </div>
    );
};

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
        body: { model: selectedModel, group: selectedGroup },
        onFinish: async (message, { finishReason }) => {
            if (message.content && (finishReason === 'stop' || finishReason === 'length')) {
                const newHistory = [
                    ...messages,
                    { role: "user", content: lastSubmittedQueryRef.current },
                    { role: "assistant", content: message.content }
                ];
                const { questions } = await suggestQuestions(newHistory, selectedModel);
                setSuggestedQuestions(questions);
            }
        }
    });

    const memoAppend = useCallback(append, [append]);
    const exportData = useMemo(() => () => {
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(messages, null, 2))}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json";
        link.click();
    }, [messages]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any);
        }
    };

    useEffect(() => {
        if (messages.length) {
            setSubmitted(true);
        }
    }, [messages.length]);

    let content;
    if (submitted) {
        content = (
            <div className="fixed bottom-2 left-1 right-1 sm:p-2 z-50 mx-auto sm:max-w-2xl md:max-w-3xl bg-black/75 rounded-md">
                <ExportButton onExport={exportData} isLoading={isLoading} />
                <ChatForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} input={input} handleKeyPress={handleKeyPress} selectedGroup={selectedGroup} isLoading={isLoading} stop={stop} />
            </div>
        );
    } else {
        content = (
            <div className='flex flex-col gap-8 sm:min-w-[22rem] md:min-w-[42rem]'>
                <ChatForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} input={input} handleKeyPress={handleKeyPress} setSelectedGroup={setSelectedGroup} submitted={submitted} selectedGroup={selectedGroup} setSelectedModel={setSelectedModel} selectedModel={selectedModel} />
                {selectedGroup === 'web' && <Trending append={memoAppend} setSubmitted={setSubmitted} />}
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className={`pb-8 sm:pb-18 pt-20 max-w-xs sm:max-w-2xl ${submitted ? 'md:min-w-[42rem]' : ''}`}>
                {content}
                {submitted && <ChatContent messages={messages} suggestedQuestions={suggestedQuestions} memoAppend={memoAppend} setSubmitted={setSubmitted} selectedModel={selectedModel} />}
            </div>
        </div>
    );
};