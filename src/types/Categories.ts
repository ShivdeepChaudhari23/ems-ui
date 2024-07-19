export interface ICategoryFieldType {
    key: string;
    label: string;
    error: boolean;
    errorMessage?: string;
    required?: boolean;
    value: '',
}

export interface ICategoryFormConfig {
    name: ICategoryFieldType;
    description: ICategoryFieldType;
}

export interface ICategoryFormBuilderProps {
    formDetails: ICategoryFormConfig;
    onChange: (fieldName: string, value: string) => void;
}
