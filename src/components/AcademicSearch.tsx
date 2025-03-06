import { Search } from 'lucide-react';
import React from 'react'

interface AcademicSearchProps {
    query: string;
    result?: AcademicResult;
}

interface AcademicResult {
    results: Array<{
        title: string;
        author: string;
        publishedAt: string;
        summary: string;
        url?: string;
    }>;
}

export const AcademicSearch = ({ query, result }: AcademicSearchProps) => {
    if (!result) {
        return (
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-medium text-zinc-50">{query}</h2>
                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent scrollbar-hover:scrollbar-thumb-neutral-600">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-3 p-3 rounded-md 
                            bg-neutral-800/70 hover:bg-neutral-800/90
                            backdrop-blur-xs shadow-sm
                            border border-neutral-800/20
                            transition-all duration-200
                            min-w-[300px] max-h-40 overflow-hidden"
                        >
                            <div className="w-10 h-10 rounded-lg bg-neutral-700 flex items-center justify-center shrink-0" />
                            <div className="flex-1 overflow-hidden">
                                <div className="h-4 w-3/4 bg-neutral-700 rounded-sm mb-2" />
                                <div className="h-3 w-1/2 bg-neutral-700 rounded-sm mb-2" />
                                <div className="h-3 w-1/3 bg-neutral-700 rounded-sm mb-2" />
                                <div className="h-3 w-2/3 bg-neutral-700 rounded-sm mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-medium text-zinc-50 flex items-center gap-2 border-b border-neutral-800 py-2">
                <Search className="w-4 h-4 text-neutral-400" />
                {query}
            </h2>

            <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent scrollbar-hover:scrollbar-thumb-neutral-600">
                {result.results.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => item.url && window.open(item.url, '_blank')}
                        className="flex items-start gap-3 p-3 rounded-md 
                        bg-neutral-800/70 hover:bg-neutral-800/90
                        backdrop-blur-xs shadow-sm
                        border border-neutral-800/20
                        transition-all duration-200
                        min-w-[300px] max-h-40 overflow-hidden
                        cursor-pointer"
                    >
                        <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0">
                            📚
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <h3 className="font-medium text-sm text-zinc-50 line-clamp-2 mb-1 break-words">{item.title}</h3>
                            <p className="text-xs text-neutral-400 mb-2 truncate">{item.author}</p>
                            <p className="text-xs text-neutral-500 truncate">{item.publishedAt}</p>
                            <p className="text-xs text-neutral-400 line-clamp-2 mt-2 break-words">{item.summary}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
