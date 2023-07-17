import { ButtonHTMLAttributes, FC } from 'react';
import styled from '@emotion/styled';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export const Button: FC<ButtonProps> = ({ text, onClick, ...props }) => {
    return (
        <CustomButton onClick={onClick} {...props}>
            {text}
        </CustomButton>
    );
};

const CustomButton = styled.button`
    border: none;
    background: lightgray;
    outline: none;

    &:disabled {
        opacity: 0.5;
        pointer-events: none;
    }
`;
