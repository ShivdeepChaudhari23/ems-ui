export const API_ENDPOINTS = {
    admin: {
        getAllEmployees: '/admin/employees',
        adminLogin: '/login/admin',
        verify: '/login/verify',
    },
    categories:{
        deleteCategory: (id: string) => `/admin/categories/${id}`,
        getAllCategories: '/admin/categories',
        addCategory: '/admin/add-category',
        editCategory: (id: string) => `admin/categories/${id}`,
    }
}