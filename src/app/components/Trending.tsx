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
        <div className='flex flex-row gap-4'>
            {trending.map((t: any) => (
                <div
                    key={t.text}
                    onClick={() => append({ role: 'user', content: t.text })}
                    className="flex flex-col rounded-lg border border-gray-600 shadow-md"
                >
                    <div className="flex items-center gap-2 p-4 w-full">
                        <div>
                            <h3 className="text-lg font-medium">{t.text}</h3>
                            <p className="text-sm text-gray-500">{t.category}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
