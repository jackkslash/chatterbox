import React from 'react'


const systemActions = ['web', 'pfd', 'research']

interface ChatFormProps {
    handleSubmit: (e: any) => void;
    handleInputChange: (e: any) => void;
    input: string;
    handleKeyPress: (e: any) => void;
    selectedGroup: string;
    setSelectedGroup?: (group: string) => void;
}

export const ChatForm = ({ handleSubmit, handleInputChange, input, handleKeyPress, selectedGroup, setSelectedGroup }: ChatFormProps) => {
    return (
        <><form onSubmit={handleSubmit}>
            <div className="max-w-3xl p-4 mx-auto sm:mx-0 sm:p-0">
                <textarea
                    className="w-full p-2 border rounded shadow-xl bg-neutral-800 border-neutral-700 text-white"
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />

                {setSelectedGroup && <div className="block group w-fit">
                    <div className="flex items-center gap-1 p-1 rounded-md bg-neutral-900 overflow-hidden transition-all duration-200 w-fit">
                        {systemActions.map((action) => (
                            <button
                                key={action}
                                onClick={() => setSelectedGroup(action)}
                                className={`group-hover:w-fit px-2 py-1 text-sm rounded-md whitespace-nowrap transition-all ${selectedGroup === action
                                    ? 'bg-neutral-800 shadow-sm'
                                    : 'text-neutral-400 hidden group-hover:block'
                                    }`}
                            >
                                {action}
                            </button>
                        ))}
                    </div>
                </div>}

            </div>
        </form></>
    )
}
