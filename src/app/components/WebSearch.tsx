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
            <div>
                <p>Loading...</p>
            </div>
        )
    }
    return (
        <div>
            {JSON.stringify({ queries }, null, 2)},
            {queries.map((query, index) => (
                <div key={index}>
                    {query}
                </div>
            ))}
            {result.searches.map((search: any, index: number) => (
                <div key={index}>
                    <h2>{search.query}</h2>
                    {search.results.map((result: any, resIndex: number) => (
                        <div key={resIndex}>
                            <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
                                <img
                                    src={`https://www.google.com/s2/favicons?sz=128&domain=${new URL(result.url).hostname}`}
                                    alt=""
                                    className="w-6 h-6 object-contain"
                                    onError={(e) => {
                                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='12' y1='8' x2='12' y2='16'/%3E%3Cline x1='8' y1='12' x2='16' y2='12'/%3E%3C/svg%3E";
                                    }}
                                />
                            </div>
                            <div>
                                <h3 className="font-medium text-sm line-clamp-1">{result.title}</h3>
                                <a
                                    href={result.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 flex items-center gap-1"
                                >
                                    {new URL(result.url).hostname}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
