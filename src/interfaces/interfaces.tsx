export interface SessionUser {
    idToken: string;
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    dueDate: string;
    completed: boolean;
}
