import React from 'react';
import Markdown, { RuleType } from 'markdown-to-jsx'
import TeX from '@matejmazur/react-katex'

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
                            className: 'my-4',
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

