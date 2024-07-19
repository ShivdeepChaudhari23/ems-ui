import { ITextAreaFieldProps } from "../types";
import { Textarea } from "@mui/joy";

const TextAreaField = ({
    value,
    error,
    label,
    required,
    fieldName,
    onChange,
    errorMessage = ''
}: ITextAreaFieldProps) => {
    return (
    <div className="!mb-8 w-full">
        <Textarea
            value={value}
            placeholder={label}
            onChange={(e) => onChange(fieldName, e.target.value)}
            required={required}
            error={error}
            minRows={3}
        />
        {error && <p className="!text-errorRed !text-[12px]">{errorMessage}</p>}
    </div>
    );
};

export default TextAreaField;
