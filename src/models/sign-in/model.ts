import { createEvent, sample } from 'effector';
import { createForm } from 'effector-forms';
import { rules } from '../../shared/formRules';

const signInForm = createForm({
    fields: {
        login: {
            init: '',
            rules: [rules.required, rules.name],
        },
        password: {
            init: '',
            rules: [rules.required],
        },
    },
});

const validate = createEvent();

sample({
    clock: validate,
    target: signInForm.validate,
});

export const signInModel = {
    signInForm,
    validate,
};
