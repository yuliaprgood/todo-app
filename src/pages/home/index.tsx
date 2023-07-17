import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGate } from 'effector-react';
import { Layout } from '../../components/layout';
import { userModel } from '../../models/user';

export const HomePage = () => {
    const navigate = useNavigate();
    useGate(userModel.load);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
        }
    });

    return <Layout />;
};
