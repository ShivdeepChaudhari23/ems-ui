import { TextField } from "@mui/material";
import { ITextInputFieldProps } from "../types";

const TextInputField = ({ value, error, label, required, fieldName, onChange }: ITextInputFieldProps) => {
    return (
        <TextField
            value={value}
            error={error}
            onChange={(e) => onChange(fieldName, e.target.value)}
            label={label}
            required={required}
            className="!mb-8 w-full"
        />
    );
};

export default TextInputField;
