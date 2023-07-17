import { createEvent, createStore, sample } from 'effector';
import { Todo } from '../../types';

const $todo = createStore<Todo | null>(null);

const setTodo = createEvent<Todo | null>();

sample({
    clock: setTodo,
    target: $todo,
});

export const model = {
    $todo,
    setTodo,
};
