'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

export const Trending = ({ append, setSubmitted }: { append: (message: any) => void, setSubmitted: (submitted: boolean) => void }) => {
    const { data: trending, isLoading, error } = useQuery({
        queryKey: ['trending-topics'],
        queryFn: async () => {
            const response = await fetch('/api/trending');
            if (!response.ok) throw new Error('Failed to fetch');
            return response.json();
        },
        staleTime: 3600000, // 1 hour
        gcTime: 3600000
    });

    if (isLoading) return (
        <div className="max-w-3xl mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="animate-pulse flex flex-col rounded-md bg-neutral-200/70 dark:bg-neutral-800/70 p-3 h-20 w-[150px]">
                        <div className="h-5 bg-neutral-300/70 dark:bg-neutral-700/70 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-neutral-300/70 dark:bg-neutral-700/70 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        </div>
    );

    if (error) return <p className="max-w-3xl mx-auto p-4">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>;

    const handleSubmit = (input: string) => {
        append({ role: 'user', content: input });
        setSubmitted(true);
    };

    return (
        <div className="max-w-3xl mx-auto px-4">
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                {trending.map((t: any) => (
                    <div
                        key={t.text}
                        onClick={() => handleSubmit(t.text)}
                        className="cursor-pointer flex flex-col rounded-md 
                        bg-white/70 hover:bg-white/90 dark:bg-neutral-800/70 dark:hover:bg-neutral-800/90
                        backdrop-blur-sm shadow-sm
                        border border-neutral-200/20 dark:border-neutral-800/20
                        p-3 transition-all duration-200"
                    >
                        <div>
                            <h3 className="text-sm font-medium text-neutral-950 dark:text-zinc-50">{t.text}</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">{t.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
