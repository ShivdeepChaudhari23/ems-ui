export interface ITextInputFieldProps {
    value: string;
    error: boolean;
    errorMessage?: string;
    onChange: (key: string, value: string) => void;
    label: string;
    required: boolean;
    fieldName: string;
    type?: string;
}
