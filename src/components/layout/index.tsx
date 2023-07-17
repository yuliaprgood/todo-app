import { FC, useState } from 'react';
import styled from '@emotion/styled';
import { Board } from '../board';
import { Menu } from '../menu';

export const Layout: FC = () => {
    const [open, setOpen] = useState(true);

    return (
        <Container open={open}>
            <Left>
                <Menu onClick={() => setOpen((prev) => !prev)} />
            </Left>
            <Board />
        </Container>
    );
};

const Container = styled.div<{ open: boolean }>`
    display: grid;
    width: 100%;
    min-height: 100vh;
    position: relative;
    box-sizing: border-box;
    grid-template-columns: ${({ open }) => (open ? '20% auto' : '3% auto')};
    div {
        overflow: hidden;
    }
    transition: grid-template-columns 0.3s;
`;

const Left = styled.div`
    cursor: pointer;
    transition: width 0.3s;
`;
