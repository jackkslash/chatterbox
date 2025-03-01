'use client'
import { signOut, useSession } from "@/lib/auth-client";
import { ArrowLeft, Box, Clock, Mail, Paperclip, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()
    const {
        data: session,
        isPending,
        error,
    } = useSession()

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isPending && !session) {
            router.push('/auth')
        }
    }, [session, isPending, router])

    // Show loading state while checking authentication
    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neutral-500"></div>
            </div>
        )
    }

    // Don't render anything if not authenticated (will redirect)
    if (!session) {
        return null
    }

    return (
        <div className="min-h-screen bg-background">
            <div className='flex flex-row justify-between items-center p-6 border-b border-neutral-800/20'>
                <Link href={'/'} className='flex flex-row gap-4 items-center hover:text-neutral-300 transition-colors'>
                    <ArrowLeft size={24} /> Back to chat
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-neutral-400">
                        {session.user?.name || session.user?.email}
                    </span>
                    <button
                        onClick={async () => {
                            await signOut({
                                fetchOptions: {
                                    onSuccess: () => {
                                        router.push('/')
                                    },
                                },
                            });
                        }}
                        className="px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row w-full md:max-w-6xl md:mx-auto">
                <nav className="fixed md:static bottom-0 left-0 right-0 md:w-64 z-10 md:space-y-2 p-4 md:min-h-[calc(100vh-80px)] md:border-r border-neutral-800/20 bg-background border-t md:border-t-0">
                    <div className="flex md:flex-col justify-around md:justify-start md:space-y-2">
                        <NavLink href="/profile/account" active={pathname === '/profile/account'}>
                            <User size={24} />
                            <span className="hidden md:inline">Account</span>
                        </NavLink>
                        <NavLink href="/profile/customisation" active={pathname === '/profile/customisation'}>
                            <Settings size={24} />
                            <span className="hidden md:inline">Customisation</span>
                        </NavLink>
                        <NavLink href="/profile/history" active={pathname === '/profile/history'}>
                            <Clock size={24} />
                            <span className="hidden md:inline">History</span>
                        </NavLink>
                        <NavLink href="/profile/models" active={pathname === '/profile/models'}>
                            <Box size={24} />
                            <span className="hidden md:inline">Models</span>
                        </NavLink>
                        <NavLink href="/profile/attachments" active={pathname === '/profile/attachments'}>
                            <Paperclip size={24} />
                            <span className="hidden md:inline">Attachments</span>
                        </NavLink>
                        <NavLink href="/profile/contact" active={pathname === '/profile/contact'}>
                            <Mail size={24} />
                            <span className="hidden md:inline">Contact Us</span>
                        </NavLink>
                    </div>
                </nav>
                <div className="md:flex-1 md:px-8 py-6">
                    {children}
                </div>
            </div>
        </div>
    )
}

// Helper component for navigation links
function NavLink({
    href,
    active,
    children,
    mobileOnly = false
}: {
    href: string;
    active: boolean;
    children: React.ReactNode;
    mobileOnly?: boolean;
}) {
    return (
        <Link
            href={href}
            className={`
                flex items-center ${mobileOnly ? 'justify-center' : 'justify-center md:justify-start'} gap-2 p-2 rounded-md transition-colors
                ${active
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'}
            `}
        >
            {children}
        </Link>
    )
}