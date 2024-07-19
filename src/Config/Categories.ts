import { ICategoryFormConfig } from "../types";

const categoryFormData: ICategoryFormConfig = {
    name: {
        key: 'name',
        value: '',
        label: 'Category Name',
        error: false,
        errorMessage: 'Category name is mandatory',
        required: true,
    },
    description: {
        key: 'description',
        value: '',
        label: 'Category Description',
        error: false,
    }
};

export default categoryFormData;
