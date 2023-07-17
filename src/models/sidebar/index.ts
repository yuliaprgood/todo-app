import { createEvent, createStore, sample } from 'effector';

const $todoSidebar = createStore<boolean>(false);

const openSidebar = createEvent();
const closeSidebar = createEvent();

sample({
    clock: openSidebar,
    source: $todoSidebar,
    fn: (isOpen) => !isOpen && true,
    target: $todoSidebar,
});

sample({
    clock: closeSidebar,
    source: $todoSidebar,
    fn: (isOpen) => isOpen && false,
    target: $todoSidebar,
});

export const model = {
    $todoSidebar,
    openSidebar,
    closeSidebar,
};
