'use client';

import { SessionUser, Task } from '@/interfaces/interfaces';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Tasks() {
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
    const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
    const { idToken } = session?.user as SessionUser;
    const fetchTasks = async () => {
        try {
            if (idToken) {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/tasks`, {
                    headers: { Authorization: `Bearer ${idToken}` },
                });
                setTasks(res.data);
            }
        } catch (error) {}
    };

    useEffect(() => {
        fetchTasks();
    }, [session]);

    // Minta izin notifikasi
    useEffect(() => {
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

    // Notifikasi task yang due hari ini
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        tasks.forEach((task) => {
            const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
            if (taskDate === today && !task.completed) {
                new Notification('Task Reminder', { body: `Task "${task.title}" is due today!` });
            }
        });
    }, [tasks]);

    const addTask = async () => {
        try {
            if (idToken) {
                await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/tasks`, newTask, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${idToken}`,
                    },
                });
                setNewTask({ title: '', description: '', dueDate: '' });
                fetchTasks();
            }
        } catch (error) {}
    };

    const updateTask = async (task: Task) => {
        try {
            if (idToken) {
                await axios.put(
                    `${process.env.NEXT_PUBLIC_BASE_API_URL}/tasks/${task.id}`,
                    { ...task, completed: !task.completed },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${idToken}`,
                        },
                    }
                );
                fetchTasks();
            }
        } catch (error) {}
    };

    const deleteTask = async (id: number) => {
        if (idToken) {
            await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/tasks/${id}`, {
                headers: { Authorization: `Bearer ${idToken}` },
            });
            fetchTasks();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Task List</h1>
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
                <div className="flex flex-col gap-4">
                    <input type="text" placeholder="Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="border p-2 rounded-lg w-full" />
                    <input type="text" placeholder="Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} className="border p-2 rounded-lg w-full" />
                    <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} className="border p-2 rounded-lg w-full" />
                    <button onClick={addTask} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                        Add Task
                    </button>
                </div>
            </div>
            <ul className="w-full max-w-3xl mt-6">
                {tasks.map((task) => (
                    <li key={task.id} className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                            <p className="text-gray-600">{task.description}</p>
                            <p className="text-gray-500 text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                            <p className={`text-sm font-medium ${task.completed ? 'text-green-600' : 'text-red-600'}`}>{task.completed ? 'Completed' : 'Pending'}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => updateTask(task)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition">
                                Toggle
                            </button>
                            <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
