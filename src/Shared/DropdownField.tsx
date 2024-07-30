import { MenuItem, TextField } from "@mui/material";
import { IDropdownOption } from "../types";

export interface IDropdownField {
    fieldName: string;
    options: IDropdownOption[];
    value: string;
    label: string;
    required?: boolean;
    error?: boolean;
    errorMessage?: string;  
    handleChange: (key: string, value: string, id?: string) => void;
}

const DropdownField = ({ options, value, label, fieldName, required = false, error = false, errorMessage = '', handleChange }: IDropdownField) => {
    
    const changeSelectedOption = (value: string) => {
        const selectedOption = options.find((item) => item.id === value);

        if (selectedOption) handleChange(fieldName, selectedOption.value, selectedOption.id);
    }
    return (
        <span className="w-full">
            <TextField
                label={label}
                value={value}
                onChange={(e) => changeSelectedOption(e.target.value)}
                id={fieldName}
                required={required}
                error={error}
                select
                className="!mt-2 !w-full"
            >
                {options.map(({ id, value }, index) => {
                    return (
                        <MenuItem key={`${fieldName}-option-${index}`} value={id}>{value}</MenuItem>
                    )
                })}
            </TextField>
            {error && <p className="!text-errorRed !text-[12px]">{errorMessage}</p>}
        </span>
    );
};

export default DropdownField;
