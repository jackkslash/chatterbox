import React from 'react';
import Markdown, { RuleType } from 'markdown-to-jsx'
import TeX from '@matejmazur/react-katex'
import 'highlight.js/styles/night-owl.css'; // or any other theme
import { toast } from 'sonner';


interface MarkdownRendererProps {
    content: string;
}

export const MarkdownRender: React.FC<MarkdownRendererProps> = ({ content }) => {

    return (
        <Markdown
            options={{
                renderRule(next, node, renderChildren, state) {
                    if (node.type === RuleType.codeBlock && node.lang === 'latex') {
                        return (
                            <TeX as="div" key={state.key}>{String.raw`${node.text}`}</TeX>
                        )
                    }
                    if (node.type === RuleType.codeBlock) {
                        const hljs = require('highlight.js');
                        const language = node.lang || 'plaintext';
                        const isLanguageSupported = hljs.getLanguage(language);
                        if (isLanguageSupported) {
                            return (
                                <div className="relative pb-4">
                                    <div className="flex justify-between items-center bg-zinc-700 p-2 rounded-t-md">
                                        <div className="text-sm text-neutral-300">
                                            {language}
                                        </div>
                                        <button
                                            className="bg-zinc-800 hover:bg-zinc-900 text-white px-2 py-1 rounded-sm text-sm"
                                            onClick={() => (
                                                navigator.clipboard.writeText(node.text)
                                                    .then(() => toast.success('Copied to clipboard'))
                                            )}
                                        >
                                            Copy
                                        </button>
                                    </div>
                                    <pre key={state.key} className='my-0 bg-zinc-600 rounded-b-md p-4 overflow-x-scroll scrollbar-thin  scrollbar-thumb-neutral-700 scrollbar-track-transparent scrollbar-hover:scrollbar-thumb-neutral-600'>
                                        <code
                                            className={`language-${language}`}
                                            dangerouslySetInnerHTML={{ __html: hljs.highlight(node.text, { language }).value }}
                                        />
                                    </pre>
                                </div>
                            );
                        } else {
                            return (
                                <div className="relative p-4">
                                    <div className="flex justify-between items-center bg-zinc-700 p-2 rounded-t-md">
                                        <div className="text-sm text-neutral-300">
                                            plaintext
                                        </div>
                                        <button
                                            className="bg-zinc-800 hover:bg-zinc-900 text-white px-2 py-1 rounded-sm text-sm"
                                            onClick={() => (
                                                navigator.clipboard.writeText(node.text)
                                                    .then(() => toast.success('Copied to clipboard'))
                                            )}
                                        >
                                            Copy
                                        </button>
                                    </div>
                                    <pre key={state.key} className='my-0 bg-zinc-600 rounded-b-md p-4 overflow-x-scroll scrollbar-thin  scrollbar-thumb-neutral-700 scrollbar-track-transparent scrollbar-hover:scrollbar-thumb-neutral-600'>
                                        <code
                                            className="language-plaintext"
                                            dangerouslySetInnerHTML={{ __html: hljs.highlight(node.text, { language: 'plaintext' }).value }}
                                        />
                                    </pre>
                                </div>
                            );
                        }
                    }
                    return next()
                },

                overrides: {
                    h1: {
                        component: 'h1',
                        props: {
                            className: 'text-4xl font-bold my-4 text-neutral-100',
                        },
                    },
                    p: {
                        component: 'p',
                        props: {
                            className: 'my-4 mb-2',
                        },
                    },
                    ul: {
                        component: 'ul',
                        props: {
                            className: 'list-disc list-inside m-2',
                        },
                    },
                    ol: {
                        component: 'ol',
                        props: {
                            className: 'list-decimal list-inside m-2',
                        },
                    },
                    a: {
                        component: 'a',
                        props: {
                            className: 'text-blue-400 underline',
                        },
                    },
                    blockquote: {
                        component: 'blockquote',
                        props: {
                            className: 'border-l-4 border-neutral-600 pl-4 italic my-4 text-neutral-700 dark:text-neutral-300',
                        },
                    },
                },
            }}
        >
            {content}
        </Markdown>
    );
};

