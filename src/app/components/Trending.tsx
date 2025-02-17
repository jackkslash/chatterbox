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
        setSliceStart((prev) => (prev + 4 >= (trending?.length || 0) ? 0 : prev + 4));
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
        <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neutral-500"></div>
        </div>
    );

    if (error) return <p className="max-w-3xl mx-auto p-4">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>;

    return (
        <div className="max-w-3xl mx-auto px-4">
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 min-h-[100px]'>
                {trending.slice(sliceStart, sliceStart + 4).map((t: any) => (
                    <div
                        key={t.text}
                        onClick={() => handleSubmit(t.text)}
                        className="cursor-pointer flex flex-col rounded-md 
                        bg-neutral-800/70 :hover:bg-neutral-800/90
                        backdrop-blur-sm shadow-sm
                        border border-neutral-800/20
                        p-3 transition-all duration-200"
                    >
                        <div>
                            <h3 className="text-sm font-medium text-zinc-50">{t.text}</h3>
                            <p className="text-sm text-neutral-400">{t.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};