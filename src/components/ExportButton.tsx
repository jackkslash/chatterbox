import { Download } from 'lucide-react';
import React from 'react'

export const ExportButton = ({ onExport, isLoading }: { onExport: () => void, isLoading: boolean }) => {
    return (
        <button
            disabled={isLoading}
            onClick={onExport}
            className="text-neutral-400 hover:text-white cursor-pointer p-1 mb-1 rounded-md hover:bg-neutral-800/70"
        >
            <Download size={16} />
        </button>
    );
};