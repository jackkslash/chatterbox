import React, { Dispatch, SetStateAction } from 'react'
import { BookA, FileText, Search, Send, StopCircleIcon } from 'lucide-react'
import { ModelSelector } from './ModelSelector';
import { ModelId } from '../lib/models';

const systemActions = [
    { id: 'web', icon: <Search size={16} /> },
    { id: 'pfd', icon: <FileText size={16} /> },
    { id: 'academic', icon: <BookA size={16} /> }
]

interface ChatFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    input: string;
    handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    selectedGroup: string;
    setSelectedGroup?: Dispatch<SetStateAction<string>>;
    isLoading?: boolean;
    stop?: () => void;
    submitted?: boolean;
    setSelectedModel?: Dispatch<SetStateAction<ModelId>>;
    selectedModel?: string;
}

export const ChatForm = ({ handleSubmit, handleInputChange, input, handleKeyPress, selectedGroup, setSelectedGroup, isLoading, stop, setSelectedModel, selectedModel, submitted }: ChatFormProps) => {
    return (
        <><form onSubmit={handleSubmit}>
            <div className="max-w-3xl mx-auto sm:mx-0 sm:p-0">
                <div className="relative border rounded-lg shadow-xl bg-neutral-800 border-neutral-700 p-1">
                    <textarea
                        className={`w-full p-2 rounded-t bg-neutral-800 text-white border-none focus:outline-none focus:ring-0 resize-none ${!setSelectedGroup ? 'h-10' : ''} scrollbar-thin scrollbar-thumb-neutral-900 scrollbar-track-neutral-800`}
                        value={input}
                        placeholder="Say something..."
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                    />
                    <div className="flex items-center justify-between gap-4 p-2">
                        <div className="flex items-center gap-4">
                            {!submitted && setSelectedModel && <ModelSelector submitted={submitted} setSelectedModel={setSelectedModel} selectedModel={selectedModel} />}
                            {setSelectedGroup && <div className="block group w-fit">
                                <div className="flex items-center gap-1 p-1 rounded-md bg-neutral-900 overflow-hidden transition-all duration-200 w-fit">
                                    {systemActions.map((action) => (
                                        <button
                                            type="button"
                                            key={action.id}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedGroup(action.id);
                                            }}
                                            className={`group-hover:w-fit px-2 py-1 text-sm rounded-md whitespace-nowrap transition-all ${selectedGroup === action.id
                                                ? 'bg-neutral-800 shadow-sm'
                                                : 'text-neutral-400 hidden group-hover:block'
                                                }`}
                                        >
                                            {action.icon}
                                        </button>
                                    ))}
                                </div>
                            </div>}
                        </div>
                        <button
                            onClick={isLoading ? stop : undefined}
                            className={`p-2 text-sm rounded-full ${isLoading
                                ? 'bg-red-700 hover:bg-red-800'
                                : 'bg-zinc-600 hover:bg-zinc-700'
                                } text-white`}
                        >
                            {isLoading ? <StopCircleIcon size={16} /> : <Send size={16} />}
                        </button>
                    </div>
                </div>
            </div>
        </form></>
    )
}
