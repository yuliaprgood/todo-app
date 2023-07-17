import styled from '@emotion/styled';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { useField } from 'effector-forms';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { userModel } from '../../models/user';
import { signInModel } from '../../models/sign-in/model';

export const LoginPage = () => {
    const [login, isValid] = useUnit([
        userModel.login,
        signInModel.signInForm.$isValid,
    ]);

    const {
        value: email,
        onChange: onEmailChange,
        hasError: hasEmailError,
        errors: emailErrors,
        validate: validateEmail,
    } = useField(signInModel.signInForm.fields.login);

    const {
        value: password,
        onChange: onPasswordChange,
        hasError: hasPasswordError,
        errors: passwordErrors,
        validate: validatePassword,
    } = useField(signInModel.signInForm.fields.password);

    const navigate = useNavigate();

    const handleSignIn = () => {
        if (isValid) {
            login({
                email,
                password,
            });
            navigate('/');
        }
    };

    return (
        <PageLayout>
            <Left />
            <Right>
                <FormWrapper>
                    <h1>Sign In</h1>
                    <Input
                        value={email}
                        label="Email"
                        onChange={(e) => onEmailChange(e.target.value)}
                        errorMessage={emailErrors?.[0]?.errorText || ''}
                        hasError={hasEmailError()}
                        onBlur={() => validateEmail()}
                    />
                    <Input
                        value={password}
                        label="Password"
                        onChange={(e) => onPasswordChange(e.target.value)}
                        errorMessage={passwordErrors?.[0]?.errorText || ''}
                        hasError={hasPasswordError()}
                        onBlur={() => validatePassword()}
                    />
                    <StyledButton
                        text="Sign In"
                        onClick={handleSignIn}
                        disabled={!isValid}
                    />
                </FormWrapper>
            </Right>
        </PageLayout>
    );
};

const PageLayout = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    box-sizing: border-box;
`;

const Left = styled.div`
    background-color: blueviolet;
    border-radius: 1rem;
    margin: 1rem;
    box-sizing: border-box;
`;

const Right = styled.div`
    background-color: yellowgreen;
    border-radius: 1rem;
    margin: 1rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FormWrapper = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    box-sizing: border-box;
`;

const StyledButton = styled(Button)`
    height: 2.5rem;
    border-radius: 0.5rem;
    background-color: lightgray;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        opacity: 0.8;
    }

    &:disabled {
        background-color: darkgray;
    }
`;
