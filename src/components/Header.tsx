"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const isActive = (path: string) => pathname === path;

    return (
        <header className="bg-white shadow-sm border-b">
            <nav className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className={`font-semibold ${isActive("/") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                            }`}
                    >
                        Feed
                    </Link>
                    {session && (
                        <Link
                            href="/drafts"
                            className={`${isActive("/drafts") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                                }`}
                        >
                            My Drafts
                        </Link>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {status === "loading" ? (
                        <span className="text-gray-500">Loading...</span>
                    ) : session ? (
                        <>
                            <span className="text-gray-700">
                                {session.user?.name || session.user?.email}
                            </span>
                            <Link
                                href="/create"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                New Post
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => signIn("github")}
                            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
                        >
                            Sign in with GitHub
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
}
