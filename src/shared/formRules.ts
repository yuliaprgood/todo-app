export const rules = {
    name: {
        name: 'name',
        validator: (value: string) =>
            value.length >= 2 &&
            value.length <= 32 &&
            /^[a-zа-яё]+$/gi.test(value),
        errorText: 'This field must contain from 2 to 32 symbols',
    },
    required: {
        name: 'required',
        validator: (value: string) => !!value,
        errorText: 'This field is required',
    },
    email: {
        name: 'email',
        validator: (value: string) => /^[\w-]+[\w.-]+[\w-]$/i.test(value),
        errorText: 'Email is not valid',
    },
    checkboxRequired: {
        name: 'required',
        validator: (value: boolean) => !!value,
        errorText: 'This field is required',
    },
};
