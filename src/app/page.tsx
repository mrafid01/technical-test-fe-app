'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session) {
        return null;
    }
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <header className="w-full max-w-3xl bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
                <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    Logout
                </button>
            </header>

            <nav className="w-full max-w-3xl mt-4 bg-white shadow-md rounded-lg p-4 flex justify-center gap-6">
                <Link href="/tasks" className="text-blue-500 hover:underline">
                    Task List
                </Link>
                <span className="text-gray-400">|</span>
                <Link href="/calendar" className="text-blue-500 hover:underline">
                    Calendar
                </Link>
            </nav>

            <main className="w-full max-w-3xl mt-6 bg-white shadow-md rounded-lg p-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">Welcome, {session.user?.name}</h2>
                <p className="text-gray-600 mt-2">Get organized and stay on top of your tasks.</p>
            </main>
        </div>
    );
}
