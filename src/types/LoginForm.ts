export interface ILoginFieldType {
    key: string;
    label: string;
    error: boolean;
    required?: boolean;
    value: '',
}

export interface ILoginFormConfig {
    username: ILoginFieldType
    password: ILoginFieldType
}
