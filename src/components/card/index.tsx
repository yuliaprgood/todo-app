import styled from '@emotion/styled';
import { FC } from 'react';
import { useUnit } from 'effector-react';
import { Todo } from '../../types';
import { Checkbox } from '../../ui/checkbox';
import { Icons } from '../../ui/icons';
import { model } from '../../models';
import { model as sidebarModel } from '../../models/sidebar';
import { model as todoModel } from '../../models/todo/model';

export const Card: FC<Todo> = (todo) => {
    const [updateTodo, openSidebar, sidebar, setTodo] = useUnit([
        model.updateTodo,
        sidebarModel.openSidebar,
        sidebarModel.$todoSidebar,
        todoModel.setTodo,
    ]);

    const { title, completed } = todo;

    const handleCheck = () => {
        updateTodo({ ...todo, completed: !completed });
    };

    const showMore = () => {
        setTodo(todo);
        if (!sidebar) {
            openSidebar();
        }
    };

    return (
        <CardWrapper>
            <Checkbox
                value={title}
                checked={completed}
                onChange={() => handleCheck()}
            />
            <Text disabled={completed} onClick={() => showMore()}>
                <h4>{title}</h4>
            </Text>
            <MoreButton onClick={() => showMore()}>
                <Icons.Arrow />
            </MoreButton>
        </CardWrapper>
    );
};

const CardWrapper = styled.div`
    border-bottom: 1px solid lightgray;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: center;
`;

const Text = styled.div<{ disabled?: boolean }>`
    width: 100%;
    color: ${({ disabled }) => (disabled ? 'gray' : 'black')};

    cursor: pointer;
    h4 {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`;
const MoreButton = styled.div`
    cursor: pointer;
`;
