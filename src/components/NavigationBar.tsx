import Link from 'next/link'
import React from 'react'

export const NavigationBar = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-[60] flex justify-between items-center p-4 
    bg-neutral-950/30 backdrop-blur-lg border-b border-neutral-800/20">
            <div className="flex items-center gap-4 space-x-4">
                <Link
                    href="/new"

                >
                    <span className="font-bold tracking-tight">
                        CHATTERBOX
                    </span>
                </Link>
            </div>
        </div>
    )
}
