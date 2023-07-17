import { useUnit } from 'effector-react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { model } from '../../models/sidebar';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { model as todoModel } from '../../models/todo/model';
import { model as todosModel } from '../../models/index';
import { Todo } from '../../types';
import { Icons } from '../../ui/icons';

export const TodoInfo = () => {
    const [sidebar, closeSidebar, todo, updateTodo, deleteTodo] = useUnit([
        model.$todoSidebar,
        model.closeSidebar,
        todoModel.$todo,
        todosModel.updateTodo,
        todosModel.deleteTodo,
    ]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleClose = () => {
        if (sidebar) {
            closeSidebar();
        }
    };

    const handleSave = () => {
        if (!todo) return;
        const newTodo: Todo = {
            ...todo,
            title,
            description,
        };
        updateTodo(newTodo);
    };

    const handleDelete = () => {
        if (!todo) return;
        deleteTodo(todo.id);
        closeSidebar();
    };

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setDescription(todo.description || '');
        }
    }, [todo]);

    if (!todo) return null;

    return (
        <Wrapper opened={sidebar}>
            <CloseButton onClick={() => handleClose()}>
                <Icons.Close />
            </CloseButton>
            <Heading>Task info</Heading>
            <Input
                value={title}
                label="Title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <Input
                value={description}
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
            />
            <ActionButtons>
                <Button text="Save changes" onClick={handleSave} />
                <Button text="Delete" onClick={handleDelete} />
            </ActionButtons>
        </Wrapper>
    );
};

const Wrapper = styled.div<{ opened?: boolean }>`
    border-radius: 1rem;
    background-color: lightgray;
    margin: 0.5rem;
    height: calc(100vh - 1rem);
    box-sizing: border-box;
    padding: 1rem;
    position: relative;
`;

const CloseButton = styled.div`
    position: absolute;
    top: 2rem;
    right: 2rem;
    cursor: pointer;
    &:hover {
        opacity: 0.5;
        transition: 0.3s;
    }
`;

const Heading = styled.h2`
    margin: 2rem 0 1rem;
`;

const ActionButtons = styled.h2`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-top: 2rem;
    button {
        height: 2.5rem;
        background-color: yellowgreen;
        border-radius: 0.5rem;
        width: 100%;
        cursor: pointer;
        transition: opacity 0.3s;
        &:hover {
            opacity: 0.5;
        }
    }
`;
