'use client';

import React, { useEffect, useState } from 'react';

export const Trending = ({ append }: any) => {
    const [trending, setTrending] = useState<any[]>([]); // State to store fetched data
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState<string | null>(null); // State to track errors

    useEffect(() => {
        const fetchTrending = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/trending');
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.statusText}`);
                }
                const data = await response.json();
                setTrending(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
