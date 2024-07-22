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

export interface Category {
    id: number;
    name: string;
    description?: string;
}

export interface GetCategoriesAPIResponse {
    status: string;
    results: Category[]
}

export interface CreateCategoryPayload {
    category: string;
    description? : string;
}

export interface CreateCategoryResponse {
    message?: string;
    status?: string;
    error?: string;
}

export interface DeleteCategoryResponse {
    meesage?: string;
    status?: string;
    error?: string;
}

export interface DeleteCategoryPayload {
    categoryId: number;
}

export interface EditCategoryPayload {
    id: number;
    name?: string;
    description?: string;
}

export interface EditCategoryResponse {
    message?: string;
    error?: string;
}
