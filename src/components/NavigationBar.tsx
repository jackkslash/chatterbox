'use client'
import { LogIn, User } from 'lucide-react'
import { useSession } from '../lib/auth-client'
import Link from 'next/link'
import React from 'react'

export const NavigationBar = () => {

    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = useSession()

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] flex justify-between items-center p-4 
        bg-neutral-950/30 backdrop-blur-lg border-b border-neutral-800/20">
            <div className="flex items-center">
                <Link
                    href="/new"
                >
                    <span className="font-bold tracking-tight">
                        CHATTERBOX
                    </span>
                </Link>
            </div>
            <div className="flex items-center gap-2 relative group">
                {session ? (
                    <>
                        <span className="text-gray-300 mr-2">{session.user?.name}</span>
                        <Link href='/profile'>
                            <User size={24}
                                className="cursor-pointer"
                            />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/auth" className="text-gray-300 hover:text-white">
                            <LogIn size={24}
                                className="cursor-pointer"
                            />
                        </Link>
                    </>

                )}
            </div>
        </div>
    )
}
