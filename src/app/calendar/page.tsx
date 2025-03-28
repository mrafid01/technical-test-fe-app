'use client';

import { SessionUser } from '@/interfaces/interfaces';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Task {
    id: number;
    title: string;
    description?: string;
    dueDate: string;
    completed: boolean;
}

export default function CalendarPage() {
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

    const [tasks, setTasks] = useState<Task[]>([]);
    const { idToken } = session?.user as SessionUser;
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const fetchTasks = async () => {
        if (idToken) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/tasks`, {
                headers: { Authorization: `Bearer ${idToken}` },
            });
            const data = await res.json();
            setTasks(data);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [session]);

    const filteredTasks = tasks.filter((task) => {
        const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
        return taskDate === selectedDate;
    });

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Calendar</h1>
            <div className="flex justify-center mb-6">
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Tasks on {selectedDate}</h2>
            <ul className="space-y-4">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <li key={task.id} className="p-4 bg-white rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                            {task.description && <p className="text-gray-600 mt-1">{task.description}</p>}
                            <p className={`mt-2 font-semibold ${task.completed ? 'text-green-600' : 'text-red-600'}`}>Status: {task.completed ? 'Completed' : 'Pending'}</p>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No tasks available for this date.</p>
                )}
            </ul>
        </div>
    );
}
