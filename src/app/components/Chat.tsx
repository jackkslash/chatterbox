'use client';

import { useChat } from 'ai/react';
import React from 'react'
import { Trending } from './Trending';

export const Chat = () => {
    const { messages, input, handleInputChange, handleSubmit, append } = useChat({
        maxSteps: 5
    });
    return (
        <div>
            <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch gap-4">
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
