import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { api } from '../api';
import { CreateTodoPayload, Todo } from '../types';

const $todos = createStore<Todo[]>([]);

const getTodos = createEvent();
const getTodosFx = createEffect(async () => {
    const { data } = await api.todos.get();
    return data;
});

const createTodo = createEvent<CreateTodoPayload>();
const createTodoFx = createEffect(async (todo: CreateTodoPayload) => {
    const { data } = await api.todos.create(todo);
    return data;
});

const updateTodo = createEvent<Todo>();
const updateTodoFx = createEffect(async (todo: Todo) => {
    const { data } = await api.todos.update(todo);
    return data;
});

const deleteTodo = createEvent<Todo['id']>();
const deleteTodoFx = createEffect(async (id: Todo['id']) => {
    const { data } = await api.todos.delete(id);
    return data;
});

sample({
    clock: getTodos,
    target: getTodosFx,
});

sample({
    clock: getTodosFx.doneData,
    target: $todos,
});

const load = createGate();

sample({
    clock: load.open,
    target: getTodos,
});

sample({
    clock: createTodo,
    target: createTodoFx,
});

sample({
    clock: createTodoFx.doneData,
    target: load.open,
});

sample({
    clock: updateTodo,
    target: updateTodoFx,
});

sample({
    clock: updateTodoFx.doneData,
    target: load.open,
});

sample({
    clock: deleteTodo,
    target: deleteTodoFx,
});

sample({
    clock: deleteTodoFx.doneData,
    target: load.open,
});

export const model = {
    load,
    $todos,
    createTodo,
    updateTodo,
    deleteTodo,
};
