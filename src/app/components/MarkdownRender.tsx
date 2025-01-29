import React from 'react'
import Marked, { ReactRenderer } from 'marked-react';

interface MarkdownRendererProps {
    content: string;
}

export const MarkdownRender: React.FC<MarkdownRendererProps> = ({ content }) => {

    const renderer: Partial<ReactRenderer> = {
        paragraph(children) {
            return <p className="my-4">{children}</p>;
        },
        heading(children, level) {
            const className = `text-${4 - level}xl font-bold my-4 text-neutral-800 dark:text-neutral-100`;
            return React.createElement(`h${level}`, { className }, children);
        },
        list(children, ordered) {
            const ListTag = ordered ? 'ol' : 'ul';
            return <ListTag className="list-inside list-disc my-4 pl-4 text-neutral-800 dark:text-neutral-200">{children}</ListTag>;
        },
        link(href, text) {
            return <a href={href} className="text-blue-600 dark:text-blue-400 underline">{text}</a>;
        },
        blockquote(children) {
            return <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-600 pl-4 italic my-4 text-neutral-700 dark:text-neutral-300">{children}</blockquote>;
        },
    };

    return (
        <div>
            <Marked renderer={renderer}>{content}</Marked>
        </div>
    )
}
