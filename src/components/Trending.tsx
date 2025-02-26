'use client';

import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useState } from 'react';

export const Trending = ({ append, setSubmitted }: { append: (message: any) => void, setSubmitted: (submitted: boolean) => void }) => {
    const [sliceStart, setSliceStart] = useState(0);

    const { data: trending = [], isLoading, error } = useQuery({
        queryKey: ['trending-topics'],
        queryFn: async () => {
            const response = await fetch('/api/trending');
            if (!response.ok) throw new Error('Failed to fetch');
            return response.json();
        },
        staleTime: 3600000,
        gcTime: 3600000
    });

    const updateSliceStart = useCallback(() => {
        setSliceStart((prev) => (prev + 5 >= (trending?.length || 0) ? 0 : prev + 5));
    }, [trending?.length]);

    useEffect(() => {
        const interval = setInterval(updateSliceStart, 5000);
        return () => clearInterval(interval);
    }, [updateSliceStart]);

    const handleSubmit = (input: string) => {
        append({ role: 'user', content: input });
        setSubmitted(true);
    };

    if (isLoading) return (
        <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-lg font-medium text-zinc-50 mb-4">Trending Topics</h2>
            <div className='grid grid-cols-5 gap-4 min-h-[100px] w'>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse rounded-md bg-neutral-800/50 h-24 w-28"></div>
                ))}
            </div>
        </div>
    );

    if (error) return <p className="max-w-3xl mx-auto p-4">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>;

    if (!trending.length) return (
        <div className="max-w-3xl mx-auto px-4">
            <p className="text-neutral-400">No trending topics available right now.</p>
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-lg font-medium text-zinc-50 mb-4">Trending Topics</h2>
            <div className='grid grid-cols-5 gap-4 min-h-[100px]'>
                {trending.slice(sliceStart, sliceStart + 5).map((t: any) => (
                    <div
                        key={t.text}
                        onClick={() => handleSubmit(t.text)}
                        className="cursor-pointer flex flex-col rounded-md 
                        bg-neutral-800/70 hover:bg-neutral-800/90
                        backdrop-blur-sm shadow-sm
                        border border-neutral-800/20
                        p-3 transition-all duration-200
                        h-24 overflow-hidden w-28"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleSubmit(t.text);
                                e.preventDefault();
                            }
                        }}
                        title={t.text}
                    >
                        <div className="h-full">
                            <h3 className="text-sm font-medium text-zinc-50 line-clamp-2">{t.text}</h3>
                            <p className="text-sm text-neutral-400 mt-auto">{t.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};