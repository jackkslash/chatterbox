import { ToolInvocation } from 'ai'
import React from 'react'

export const ToolInvocations = ({ toolInvocations }: { toolInvocations: ToolInvocation[] }) => {
    {/* <pre>{JSON.stringify(toolInvocations, null, 2)}</pre> */ }

    if (!toolInvocations) return null;
    if (toolInvocations[0].toolName === "web_search") {
        return (
            <div className="flex flex-col gap-2">
                {toolInvocations[0].args.queries?.map((q: any, i: any) => (
                    <div key={i} className="flex flex-row gap-2">
                        <q>{q}</q>
                    </div>
                ))}
            </div>
        )
    }
}
