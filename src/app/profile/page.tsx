'use client'

import { redirect } from 'next/navigation'


function page() {
    // Redirect to a default sub-route
    redirect('/profile/account');

    // This will never render because of the redirect
    return null;
}

export default page