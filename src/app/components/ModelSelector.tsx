import React from 'react'
import { Toaster, toast } from 'sonner'

interface ModelOption {
    id: string;
    label: string;
}

interface ModelSelectorProps {
    submitted: boolean;
    setSelectedModel: (model: string) => void;
    selectedModel: string;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ submitted, setSelectedModel, selectedModel }) => {
    return (
        <div className='flex items-center space-x-4'>
            <Toaster richColors theme='dark' position="top-right" />
            <div className="relative">
                {/* Mobile Dropdown */}
                <select
                    className="md:hidden px-3 py-1 rounded-md bg-neutral-900 text-sm text-neutral-400"
                    value={selectedModel}
                    onChange={(e) => !submitted ? setSelectedModel(e.target.value) :
                        toast.info('Can not change model while mid-conversation.')}
                >
                    {[
                        { id: 'gpt-4o-mini', label: '4o-mini' },
                        { id: 'c', label: 'Claude 3 Sonnet' },
                        { id: 'd', label: 'DeepSeek-R1' }
                    ].map(({ id, label }: ModelOption) => (
                        <option key={id} value={id}>{label}</option>
                    ))}
                </select>

                {/* Desktop Hover Menu */}
                <div className="hidden md:block">
                    <div className="flex items-center gap-1 p-1 rounded-md bg-neutral-900 overflow-hidden transition-all duration-200 group-hover:w-auto w-fit">
                        {[
                            { id: 'gpt-4o-mini', label: '4o-mini' },
                            { id: 'c', label: 'Claude 3 Sonnet' },
                            { id: 'd', label: 'DeepSeek-R1' }
                        ].map(({ id, label }: ModelOption) => (
                            <button
                                key={id}
                                onClick={!submitted ? () => setSelectedModel(id) : () => {
                                    toast.info('Can not change model while mid-conversation.')
                                }}
                                className={`px-2 py-1 text-sm rounded-md whitespace-nowrap transition-all ${selectedModel === id
                                        ? 'bg-neutral-800 shadow-sm'
                                        : submitted ? 'shadow-sm hidden group-hover:block text-zinc-600' : 'text-neutral-400 hidden group-hover:block'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
