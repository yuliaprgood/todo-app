import { FC, forwardRef, InputHTMLAttributes, RefObject } from 'react';
import styled from '@emotion/styled';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    value: string;
    hasError?: boolean;
    errorMessage?: string;
    wrapperRef?: RefObject<HTMLLabelElement>;
    label?: string;
}

export const Checkbox: FC<InputProps> = forwardRef<
    HTMLInputElement,
    InputProps
>(
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
                <CustomInput
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    type="checkbox"
                    {...props}
                />
                <Checkmark error={hasError} checked={!!props.checked} />
                <div>{label}</div>
                {errorMessage && <Error>{errorMessage}</Error>}
            </CustomLabel>
        );
    },
);

Checkbox.displayName = 'Checkbox';

const CustomInput = styled.input`
    box-sizing: border-box;
    width: 0;
    height: 0;
    position: absolute;
    opacity: 0;
`;

const Checkmark = styled.div<{
    error?: boolean;
    checked: boolean;
}>`
    border: ${({ error }) => (error ? '1px solid red' : '1px solid lightgray')};
    position: relative;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    cursor: pointer;

    &:after {
        display: ${({ checked }) => (checked ? 'block' : 'none')};
        position: absolute;
        content: '';
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid green;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
    }
`;

const CustomLabel = styled.label`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    width: fit-content;
    position: relative;
`;

const Error = styled.div`
    color: red;
    font-size: 12px;
`;
