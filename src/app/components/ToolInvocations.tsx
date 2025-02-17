import { ToolInvocation } from 'ai'
import React, { useCallback } from 'react'
import { WebSearch } from './WebSearch';
import { AcademicSearch } from './AcademicSearch';

export const ToolInvocations = ({ toolInvocations }: { toolInvocations: ToolInvocation[] }) => {

    const render = useCallback((toolInvocation: ToolInvocation, index: number) => {
        if (toolInvocation.toolName === 'web_search') {
            return <WebSearch key={index} queries={toolInvocation.args.queries} result={'result' in toolInvocation ? toolInvocation.result : undefined} />;
        } else if (toolInvocation.toolName === 'academic_search') {
            return <AcademicSearch key={index} query={toolInvocation.args.query} result={'result' in toolInvocation ? toolInvocation.result : undefined} />;
        }
        else {
            return <div key={index}>{JSON.stringify(toolInvocation, null, 2)}</div>
        }
    }, [])
    return toolInvocations.map(
        (toolInvocation: ToolInvocation, toolIndex: number) => (
            <div key={`tool-${toolIndex}`}>
                {render(toolInvocation, toolIndex)}
            </div>
        )
    );
}
