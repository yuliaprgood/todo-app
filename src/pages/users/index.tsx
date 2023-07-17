import { useGate, useUnit } from 'effector-react';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { userModel } from '../../models/user';
import { UserRoles } from '../../types';

export const UsersPage = () => {
    useGate(userModel.load);
    const [user, users, getUsers] = useUnit([
        userModel.$user,
        userModel.$users,
        userModel.getUsers,
    ]);

    useEffect(() => {
        if (user && user.role === UserRoles.Admin) {
            getUsers();
        }
    }, [user]);

    if (user?.role !== UserRoles.Admin) {
        return <Wrapper>You do not have access to this page</Wrapper>;
    }
    return (
        <Wrapper>
            {users.length > 0 &&
                users.map((user) => <div key={user.id}>{user.email}</div>)}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 2rem;
    justify-content: center;
    font-size: 1.5rem;
`;
