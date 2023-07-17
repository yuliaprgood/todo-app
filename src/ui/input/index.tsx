import { FC, forwardRef, InputHTMLAttributes, RefObject } from 'react';
import styled from '@emotion/styled';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    value: string;
    hasError?: boolean;
    errorMessage?: string;
    wrapperRef?: RefObject<HTMLLabelElement>;
    label?: string;
}

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            value,
            onChange,
            errorMessage,
            hasError,
            label,
            wrapperRef = false,
            ...props
        },
        ref,
    ) => {
        return (
            <CustomLabel>
                <div>{label}</div>
                <CustomInput
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    error={hasError}
                    {...props}
                />
                <Error>{errorMessage}</Error>
            </CustomLabel>
        );
    },
);

Input.displayName = 'Input';

const CustomInput = styled.input<{
    error?: boolean;
}>`
    border: ${({ error }) => (error ? '1px solid red' : '1px solid lightgray')};
    border-radius: 4px;
    padding: 4px 8px;
    outline: none;
    height: 40px;
    width: 100%;
    box-sizing: border-box;
`;

const CustomLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
`;

const Error = styled.div`
    color: red;
    font-size: 12px;
`;
