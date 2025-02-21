'use client'

import { signIn } from '../../lib/auth-client'
import React from 'react'

export default function page() {
    return (
        <div>
            <h1>Auth Page</h1>
            <button onClick={async () => {
                await signIn.social({
                    provider: 'github',
                    callbackURL: '/'
                })
            }}>
                Login
            </button>
        </div>
    )
}
