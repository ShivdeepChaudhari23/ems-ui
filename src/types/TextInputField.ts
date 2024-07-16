export interface ITextInputFieldProps {
    value: string;
    error: boolean;
    onChange: (key: string, value: string) => void;
    label: string;
    required: boolean;
    fieldName: string;
}