import React, { act, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { ModelId } from '../lib/models';
import { useModelPreferences } from '../hooks/useModelPreferences'; // ✅ Import custom hook

interface ModelSelectorProps {
    submitted?: boolean;
    setSelectedModel?: Dispatch<SetStateAction<ModelId>>;
    selectedModel?: string;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ submitted, setSelectedModel, selectedModel }) => {
    const [isOpen, setIsOpen] = useState(false);
    const activeModels = useModelPreferences(); // ✅ Fetches filtered models

    useEffect(() => {
        if (setSelectedModel && activeModels.length > 0) {
            setSelectedModel(activeModels[0].id);
        }
    }, [setSelectedModel, activeModels]);

    return (
        <div className="relative">
            <Toaster richColors theme="dark" position="top-right" />

            {/* Mobile Button */}
            <button
                className="md:hidden px-3 py-1 rounded-md bg-neutral-900 text-sm text-neutral-400"
                onClick={() => setIsOpen(true)}
            >
                {activeModels.find(m => m.id === selectedModel)?.label || "Select Model"}
            </button>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
                    onClick={(e) => {
                        e.preventDefault();
                        if (e.target === e.currentTarget) setIsOpen(false);
                    }}
                >
                    <div className="absolute bottom-0 left-0 right-0 bg-neutral-900 rounded-t-xl p-4">
                        <div className="flex flex-col space-y-2">
                            {activeModels.map(({ id, label }) => (
                                <button
                                    key={id}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (!submitted && setSelectedModel) {
                                            setSelectedModel(id);
                                            setIsOpen(false);
                                        } else {
                                            toast.info("Model is not available.");
                                        }
                                    }}
                                    className={`px-4 py-2 text-left rounded-md ${selectedModel === id ? "bg-neutral-800" : "text-neutral-400"
                                        }`}
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
                    onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }}
                    className="px-3 py-1 rounded-md bg-neutral-900 text-sm text-neutral-400"
                >
                    {activeModels.find(m => m.id === selectedModel)?.label || "Select Model"}
                </button>

                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <div className="absolute top-full mt-1 z-50 bg-neutral-900 rounded-md shadow-lg left-1/2 transform -translate-x-1/2">
                            <div className="flex flex-col p-1">
                                {activeModels.map(({ id, label }) => (
                                    <button
                                        key={id}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (!submitted && setSelectedModel) {
                                                setSelectedModel(id);
                                                setIsOpen(false);
                                            } else {
                                                toast.info("Model is not available.");
                                            }
                                        }}
                                        className={`px-2 py-1 text-sm rounded-md whitespace-nowrap ${selectedModel === id
                                            ? "bg-neutral-800 shadow-xs"
                                            : "text-neutral-400"
                                            }`}
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
    );
};
