import { useGate, useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Input } from '../../ui/input';
import { model } from '../../models';
import { Icons } from '../../ui/icons';
import { userModel } from '../../models/user';

export const AddTodo = () => {
    useGate(userModel.load);
    const [user, createTodo] = useUnit([userModel.$user, model.createTodo]);

    const [value, setValue] = useState('');

    const handleAddTodo = () => {
        if (user && value) {
            createTodo({
                title: value,
                description: '',
                completed: false,
                active: true,
                tags: [],
                userId: user.id,
            });
            setValue('');
        }
    };

    return (
        <Wrapper>
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Add new task"
            />
            <AddButton onClick={() => handleAddTodo()}>
                <Icons.Plus />
            </AddButton>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const AddButton = styled.button`
    border: none;
    outline: none;
    background-color: black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;
    cursor: pointer;
    transition: opacity 0.3s;
    &:hover {
        opacity: 0.5;
    }
    svg {
        color: white;
    }
`;
