import React from 'react'


interface WebSearchProps {
    queries: string[];
    result?: SearchResult;
}

interface SearchResult {
    searches: Array<{
        query: string;
        results: Array<{
            title: string;
            url: string;
        }>;
    }>;
}

export const WebSearch = ({ queries, result }: WebSearchProps) => {

    if (!result) {
        return (
            <div className="flex flex-col gap-4">
                {queries.map((query, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <h2 className="text-lg font-medium text-zinc-50">{query}</h2>
                        <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-thin  scrollbar-thumb-neutral-700 scrollbar-track-transparent hover:scrollbar-thumb-neutral-600">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3 p-3 rounded-md 
                                    bg-neutral-800/70
                                    backdrop-blur-sm shadow-sm
                                    border  border-neutral-800/20
                                    min-w-[300px]"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-neutral-700 flex items-center justify-center" />
                                    <div className="flex-1">
                                        <div className="h-4 w-3/4 bg-neutral-700 rounded mb-2" />
                                        <div className="h-3 w-1/2 bg-neutral-700 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-4">
            {result.searches.map((search: any, index: number) => (
                <div key={index} className="flex flex-col gap-2 w-full">
                    <h2 className="text-lg font-medium text-zinc-50">{search.query}</h2>
                    <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-thin  scrollbar-thumb-neutral-700 scrollbar-track-transparent hover:scrollbar-thumb-neutral-600">
                        {search.results.map((result: any, resIndex: number) => (
                            <div
                                key={resIndex}
                                className="flex items-start gap-3 p-3 rounded-md 
             bg-neutral-800/70 hover:bg-neutral-800/90
            backdrop-blur-sm shadow-sm
            border border-neutral-800/20
            transition-all duration-200
            min-w-[300px]"
                            >
                                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={`https://www.google.com/s2/favicons?sz=128&domain=${new URL(result.url).hostname}`}
                                        alt=""
                                        className="w-6 h-6 object-contain"
                                        onError={(e) => {
                                            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='12' y1='8' x2='12' y2='16'/%3E%3Cline x1='8' y1='12' x2='16' y2='12'/%3E%3C/svg%3E";
                                        }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-sm text-zinc-50 line-clamp-1">{result.title}</h3>
                                    <a
                                        href={result.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-neutral-400hover:text-neutral-300 flex items-center gap-1"
                                    >
                                        {new URL(result.url).hostname}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
