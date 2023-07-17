import styled from '@emotion/styled';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { Icons } from '../../ui/icons';
import { userModel } from '../../models/user';

export type MenuProps = {
    onClick: () => void;
};

export const Menu: FC<MenuProps> = ({ onClick }) => {
    const navigate = useNavigate();

    const user = useUnit(userModel.$user);

    const handleLogout = () => {
        localStorage.clear();
        setTimeout(() => {
            navigate('/login');
        }, 500);
    };

    return (
        <MenuWrapper>
            <div>
                <div onClick={onClick}>
                    <Icons.Menu />
                </div>
                <Link to="/users">Load all users</Link>
            </div>
            <div onClick={() => handleLogout()}>
                <Icons.Logout />
            </div>
        </MenuWrapper>
    );
};

const MenuWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0.5rem;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;
`;
