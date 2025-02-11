import React, { useState } from 'react'
import { Toaster, toast } from 'sonner'
import { modelOptions } from '../lib/models';
import { XIcon } from 'lucide-react';

interface ModelSelectorProps {
    submitted?: boolean;
    setSelectedModel?: (model: string) => void;
    selectedModel?: string;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ submitted, setSelectedModel, selectedModel }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='relative'>
            <Toaster richColors theme='dark' position="top-right" />

            {/* Mobile Button */}
            <button
                className="md:hidden px-3 py-1 rounded-md bg-neutral-900 text-sm text-neutral-400"
                onClick={() => setIsOpen(true)}
            >
                {modelOptions.find(m => m.id === selectedModel)?.label || 'Select Model'}
            </button>

            {/* Mobile Bottom Sheet */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsOpen(false);
                    }}
                >
                    <div className="absolute bottom-0 left-0 right-0 bg-neutral-900 rounded-t-xl p-4">
                        <div className="flex flex-col space-y-2">
                            {modelOptions.map(({ id, label, active }) => (

                                <button
                                    key={id}
                                    onClick={() => {
                                        if (!submitted && setSelectedModel && active) {
                                            setSelectedModel(id);
                                            setIsOpen(false);
                                        } else {
                                            toast.info('Model is not available.');
                                        }
                                    }}
                                    className={`px-4 py-2 text-left rounded-md ${selectedModel === id ? 'bg-neutral-800' : 'text-neutral-400'
                                        } ${!active ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {label}
                                </button>

                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop Dropdown */}
            <div className="hidden md:block relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-3 py-1 rounded-md bg-neutral-900 text-sm text-neutral-400"
                >
                    {modelOptions.find(m => m.id === selectedModel)?.label || 'Select Model'}
                </button>

                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <div className="absolute top-full mt-1 z-50 bg-neutral-900 rounded-md shadow-lg left-1/2 transform -translate-x-1/2">
                            <div className="flex flex-col p-1">
                                {modelOptions
                                    .sort((a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0))
                                    .map(({ id, label, active }) => (
                                        <button
                                            key={id}
                                            onClick={() => {
                                                if (active && !submitted && setSelectedModel) {
                                                    setSelectedModel(id);
                                                    setIsOpen(false);
                                                } else {
                                                    toast.info(active ? 'Can not change model while mid-conversation.' : 'This model is not available.');
                                                }
                                            }}
                                            className={`px-2 py-1 text-sm rounded-md whitespace-nowrap ${selectedModel === id
                                                ? 'bg-neutral-800 shadow-sm'
                                                : 'text-neutral-400'
                                                } ${!active ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {label}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
