import { TextField } from "@mui/material";
import { ITextInputFieldProps } from "../types";

const TextInputField = ({
    value,
    error,
    label,
    required,
    fieldName,
    onChange,
    errorMessage = '',
    type = 'text',
}: ITextInputFieldProps) => {
    return (
    <div className="!mb-8 w-full">
        <TextField
            value={value}
            error={error}
            onChange={(e) => onChange(fieldName, e.target.value)}
            label={label}
            required={required}
            type={type}
            className="w-full"
        />
        {error && <p className="!text-errorRed !text-[12px]">{errorMessage}</p>}
    </div>
    );
};

export default TextInputField;
