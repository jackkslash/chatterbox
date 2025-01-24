'use client';

import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

export const Trending = ({ append }: any) => {
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

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error instanceof Error ? error.message : 'Unknown error'}</p>;

    return (
        <div className='flex flex-row gap-4 max-w-3xl overflow-auto'>
            {trending.map((t: any) => (
                <div
                    key={t.text}
                    onClick={() => append({ role: 'user', content: t.text })}
                    className="flex flex-col rounded-lg border border-gray-700 shadow-md p-2 bg-zinc-900"
                >
                    <div>
                        <h3 className="text-sm font-medium truncate">{t.text}</h3>
                        <p className="text-sm text-gray-500 truncate">{t.category}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
