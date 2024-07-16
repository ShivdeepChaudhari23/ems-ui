import { VisibilityOff, Visibility } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";

import { ITextInputFieldProps } from "../types";

const PasswordInputField = ({ value, error, label, required, fieldName, onChange }: ITextInputFieldProps) => {
    const [shouldShowPassword, setShouldShowPassword] = useState(false);
    
    return (
        <TextField
            value={value}
            error={error}
            onChange={(e) => onChange(fieldName, e.target.value)}
            label={label}
            required={required}
            className="!mb-8 w-full"
            type={shouldShowPassword ? 'text' : 'password'}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShouldShowPassword((prev) => (!prev))}
                      edge="end"
                    >
                      {shouldShowPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
        />
    );
};

export default PasswordInputField;
