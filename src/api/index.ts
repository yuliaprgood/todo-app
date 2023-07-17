import axios from 'axios';
import { LoginUserPayload, Todo } from '../types';

const BASE_URL = 'http://localhost:3000';

export const axiosInstance = axios.create({ baseURL: BASE_URL });

const todos = {
    get: () => axiosInstance.get(`/todos`),
    create: (todo: Omit<Todo, 'id'>) =>
        axiosInstance.post('/todos', todo, {
            headers: {
                'Content-Type': 'application/json',
            },
        }),
    update: (todo: Todo) =>
        axiosInstance.put(`/todos/${todo.id}`, todo, {
            headers: {
                'Content-Type': 'application/json',
            },
        }),
    delete: (id: Todo['id']) => axiosInstance.delete(`/todos/${id}`),
};

const users = {
    get: () => axiosInstance.get(`/users`),
    getById: (id: number) => axiosInstance.get(`/users/${id}`),
    create: (user: LoginUserPayload) => axiosInstance.post('/register', user),
    login: (user: LoginUserPayload) => axiosInstance.post('/login', user),
};

export const api = {
    todos,
    users,
};
