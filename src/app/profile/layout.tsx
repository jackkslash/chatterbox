'use client'
import { signOut, useSession } from "@/lib/auth-client";
import { ArrowLeft, Box, Clock, Mail, Paperclip, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = useSession()

    return (
        <div>
            <div className='flex flex-row justify-between items-center p-6'>
                <Link href={'/'} className='flex flex-row gap-4'><ArrowLeft size={24} /> Back to chat</Link>
                <button onClick={async () => {
                    await signOut({
                        fetchOptions: {
                            onSuccess: () => {
                                router.push('/')
                            },
                        },
                    });
                }}>
                    Logout
                </button>
            </div>
            <div className="flex flex-col md:flex-row w-full md:max-w-6xl md:mx-auto">
                <nav className="fixed md:static bottom-0 left-0 right-0 md:w-64 z-10 md:space-y-2 p-4">
                    <div className="flex md:flex-col justify-around md:justify-start">
                        <Link href="/profile/account" className="flex items-center justify-center md:justify-start gap-2 p-2">
                            <User size={24} />
                            <span className="hidden md:inline">Account</span>
                        </Link>
                        <Link href="/profile/customisation" className="flex items-center justify-center md:justify-start gap-2 p-2 ">
                            <Settings size={24} />
                            <span className="hidden md:inline">Customisation</span>
                        </Link>
                        <Link href="/profile/history" className="flex items-center justify-center md:justify-start gap-2 p-2 ">
                            <Clock size={24} />
                            <span className="hidden md:inline">History</span>
                        </Link>
                        <Link href="/profile/models" className="flex items-center justify-center md:justify-start gap-2 p-2 ">
                            <Box size={24} />
                            <span className="hidden md:inline">Models</span>
                        </Link>
                        <Link href="/profile/attachments" className="flex items-center justify-center md:justify-start gap-2 p-2 ">
                            <Paperclip size={24} />
                            <span className="hidden md:inline">Attachments</span>
                        </Link>
                        <Link href="/profile/contact" className="flex items-center justify-center md:justify-start gap-2 p-2 ">
                            <Mail size={24} />
                            <span className="hidden md:inline">Contact Us</span>
                        </Link>
                    </div>
                </nav>
                <div className="md:flex-1 md:px-8">
                    {children}
                </div>
            </div>
        </div>
    )
}