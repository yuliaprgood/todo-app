import { useUnit } from 'effector-react';
import { model } from '../../models';
import { Card } from '../card';

export const TodoList = () => {
    const [todos] = useUnit([model.$todos, model.createTodo]);

    return (
        <div>
            {todos.length > 0 &&
                todos.map((todo) => <Card key={todo.id} {...todo} />)}
        </div>
    );
};
