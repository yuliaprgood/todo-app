import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { api } from '../../api';
import { LoginUserPayload, User } from '../../types';

const $user = createStore<User | null>(null);
const $users = createStore<User[]>([]);

const login = createEvent<LoginUserPayload>();

const getUser = createEvent();
const getUserFx = createEffect(async (id: User['id']) => {
    const { data } = await api.users.getById(id);
    return data;
});

const loginFx = createEffect(async (payload: LoginUserPayload) => {
    const { data } = await api.users.login(payload);
    return data;
});

const getUsers = createEvent();

const getUsersFx = createEffect(async () => {
    const { data } = await api.users.get();
    return data;
});

sample({
    clock: getUsers,
    target: getUsersFx,
});

sample({
    clock: getUsersFx.doneData,
    target: $users,
});

sample({
    clock: login,
    target: loginFx,
});

sample({
    clock: loginFx.doneData,
    fn: (data) => {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data.user;
    },
    target: $user,
});

const load = createGate();

sample({
    clock: load.open,
    target: getUser,
});

sample({
    clock: getUser,
    fn: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user).id : null;
    },
    target: getUserFx,
});

sample({
    clock: getUserFx.doneData,
    target: $user,
});

export const userModel = {
    $user,
    login,
    load,
    $users,
    getUsers,
};
