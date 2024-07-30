import { InputLabel } from "@mui/material";
import { ITextAreaFieldProps } from "../types";
import { Textarea } from "@mui/joy";

const TextAreaField = ({
    value,
    error = false,
    label,
    required = false,
    fieldName,
    onChange,
    errorMessage = ''
}: ITextAreaFieldProps) => {
    return (
    <div className="!mb-8 w-full">
        <InputLabel htmlFor={`text-area-for-${fieldName}`} error={error} required={required}>{label}</InputLabel>
        <Textarea
            value={value}
            onChange={(e) => onChange(fieldName, e.target.value)}
            required={required}
            error={error}
            minRows={3}
            id={`text-area-for-${fieldName}`}
            
        />
        {error && <p className="!text-errorRed !text-[12px]">{errorMessage}</p>}
    </div>
    );
};

export default TextAreaField;
