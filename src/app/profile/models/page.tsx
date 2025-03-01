'use client'
import { modelOptions } from '@/lib/models'
import { ServerIcon, BrainIcon, ImageIcon } from 'lucide-react';
import React, { useEffect, } from 'react'

function page() {
    const [enabledModels, setEnabledModels] = React.useState<{ [key: string]: boolean }>({});


    const toggleModel = (modelId: string) => {
        setEnabledModels(prev => {
            const newState = {
                ...prev,
                [modelId]: !prev[modelId]
            };
            return newState;
        });
    };
    return (
        <div>
            <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-2xl font-semibold mb-4">Models</h2>
                <div className='grid grid-cols-1 gap-4 min-h-[100px] mb-16 sm:mb-0'>
                    {modelOptions.map((model, i) => (
                        <div key={i} className="flex flex-col gap-2 p-4 rounded-md bg-neutral-900/70 border border-neutral-800/20 w-96">
                            <div className='flex flex-row justify-between'>
                                <h3 className="text-lg font-medium text-neutral-200">{model.label}</h3>
                                <button
                                    className={`w-12 h-6 rounded-full relative ${enabledModels[model.id]
                                        ? 'bg-green-600'
                                        : 'bg-neutral-800'
                                        }`}
                                    onClick={() => toggleModel(model.id)}
                                >
                                    <div
                                        className={`absolute top-1 h-4 w-4 rounded-full transition-transform ${enabledModels[model.id]
                                            ? 'bg-white translate-x-7'
                                            : 'bg-neutral-400 translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                            <p className="text-neutral-400">{model.description}</p>
                            <div className="flex gap-1">
                                <div className="flex items-center gap-1 px-1.5 py-0.5 text-xs rounded-md bg-neutral-800 text-neutral-400">
                                    <ServerIcon size={12} />
                                    {model.provider}
                                </div>
                                {model.features.reasoning && (
                                    <div className="flex items-center gap-1 px-1.5 py-0.5 text-xs rounded-md bg-neutral-800 text-neutral-400">
                                        <BrainIcon size={12} />
                                        Reasoning
                                    </div>
                                )}
                                {model.features.imageInput && (
                                    <div className="flex items-center gap-1 px-1.5 py-0.5 text-xs rounded-md bg-neutral-800 text-neutral-400">
                                        <ImageIcon size={12} />
                                        Image
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div >

            </div>
        </div>
    )
}

export default page