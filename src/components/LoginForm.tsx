import { Button } from "@mui/material";
import { ILoginFormConfig } from "../types";
import { messages } from "../utils/messages";
import { PasswordInputField, TextInputField } from "../Shared";

interface ILoginFormProps {
    formConfig: ILoginFormConfig;
    onSubmit: () => void;
    onChange: (key: string, value: string) => void;
}

const LoginForm = ({ formConfig, onChange }: ILoginFormProps) => {
    const { username, password } = formConfig;
    const isSubmitDisabled = !username.value || !password.value;

    return (
        <div className="m-auto mx-12">
            <h2 className="mb-8 text-[2rem] font-bold text-center">{messages.signin}</h2>
            {Object.keys(formConfig).map((field) => {
                const fieldData = formConfig[field as keyof ILoginFormConfig];
                const { key, value, error, label, required = false } = fieldData;
                return fieldData.key === 'username' ? (
                    <TextInputField
                        value={value}
                        error={error}
                        label={label}
                        required={required}
                        onChange={onChange}
                        fieldName={key}
                    />
                ) : (
                    <PasswordInputField
                        value={value}
                        error={error}
                        label={label}
                        required={required}
                        onChange={onChange}
                        fieldName={key}
                    />
                );
            })}
            <Button variant="contained" className="background-primaryBlue !disabled:background-secondaryBlue w-full" disabled={isSubmitDisabled}>{messages.login}</Button>
        </div>
    );
};

export default LoginForm;