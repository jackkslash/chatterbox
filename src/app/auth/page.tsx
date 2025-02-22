'use client'

import { ArrowLeft } from 'lucide-react'
import { signIn } from '../../lib/auth-client'
import React from 'react'
import Link from 'next/link'

export default function page() {
    return (
        <div>
            <Link href={'/'} className='flex flex-row gap-2 pl-6 pt-6'><ArrowLeft size={24} /> Back to chat</Link>
            <div className='flex flex-col gap-4 p-6 mx-auto min-h-[calc(100vh-6rem)] items-center justify-center w-full max-w-lg'>
                <h1>Welcome to Chatterbox</h1>
                <button className='bg-neutral-900 rounded-md px-4 py-2 hover:bg-neutral-800 font-bold text-white' onClick={async () => {
                    await signIn.social({
                        provider: 'github',
                        callbackURL: '/'
                    })
                }}>
                    Contine with GitHub
                </button>
                <button className='bg-neutral-900 rounded-md px-4 py-2 hover:bg-neutral-800 font-bold text-white'>
                    Contine with Google
                </button>
            </div>

        </div>
    )
}
