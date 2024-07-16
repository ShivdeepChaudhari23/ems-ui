import { ILoginFormConfig } from "../types";

export const loginFormData: ILoginFormConfig = {
    username: {
        key: 'username',
        label: 'Username',
        error: false,
        required: true,
        value: '',
    },
    password: {
        key: 'password',
        label: 'Password',
        error: false,
        required: true,
        value: '',
    }
};
