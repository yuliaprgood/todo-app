import styled from '@emotion/styled';
import { useGate, useUnit } from 'effector-react';
import { AddTodo } from '../add-todo';
import { TodoList } from '../todo-list';
import { model } from '../../models/sidebar';
import { model as todosModel } from '../../models';
import { TodoInfo } from '../todo-info';

export const Board = () => {
    useGate(todosModel.load);

    const todoInfoIsOpen = useUnit(model.$todoSidebar);

    return (
        <BoardLayout open={todoInfoIsOpen}>
            <div>
                <h1>Task list</h1>
                <AddTodo />
                <TodoList />
            </div>
            <Side>
                <TodoInfo />
            </Side>
        </BoardLayout>
    );
};

const BoardLayout = styled.div<{ open: boolean }>`
    display: grid;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    grid-template-columns: ${({ open }) => (open ? 'auto 40%' : 'auto 0%')};
    padding: 1rem;
    gap: 1rem;
    div {
        overflow: hidden;
    }
    transition: grid-template-columns 0.3s;
`;

const Side = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
`;
