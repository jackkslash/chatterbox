import React from 'react'
import { Toaster, toast } from 'sonner'

interface ModelOption {
    id: string;
    label: string;
    active: boolean;
}

interface ModelSelectorProps {
    submitted: boolean;
    setSelectedModel: (model: string) => void;
    selectedModel: string;
}
const modelOptions: ModelOption[] = [
    { id: 'gpt-4o-mini', label: '4o-mini', active: true },
    { id: 'o1-mini', label: 'o1-mini', active: false },
    { id: 'deepseek-reasoner', label: 'DeepSeek-R1', active: false },
]

export const ModelSelector: React.FC<ModelSelectorProps> = ({ submitted, setSelectedModel, selectedModel }) => {
    console.log('ModelSelector', selectedModel)
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
                    {modelOptions.map(({ id, label, active }: ModelOption) => (
                        active ? <option key={id} value={id}>{label}</option> : null
                    ))}
                </select>

                <div className="hidden md:block group"> {/* Added group class here */}
                    <div className="flex items-center gap-1 p-1 rounded-md bg-neutral-900 overflow-hidden transition-all duration-200 group-hover:w-auto w-fit">
                        {modelOptions.map(({ id, label, active }: ModelOption) => (
                            <button
                                key={id}
                                onClick={active && !submitted ? () => setSelectedModel(id) : () => {
                                    toast.info(active ? 'Can not change model while mid-conversation.' : 'This model is not available.')
                                }}
                                className={`px-2 py-1 text-sm rounded-md whitespace-nowrap transition-all ${selectedModel === id
                                    ? 'bg-neutral-800 shadow-sm'
                                    : submitted ? 'shadow-sm hidden group-hover:block text-zinc-600' : 'text-neutral-400 hidden group-hover:block'
                                    } ${!active ? 'opacity-50 cursor-not-allowed' : ''}`}
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
