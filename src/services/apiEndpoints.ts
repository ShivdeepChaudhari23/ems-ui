export const API_ENDPOINTS = {
    admin: {
        adminLogin: '/login/admin',
        verify: '/login/verify',
    },
    categories: {
        deleteCategory: (id: string) => `/admin/categories/${id}`,
        getAllCategories: '/admin/categories',
        addCategory: '/admin/add-category',
        editCategory: (id: string) => `admin/categories/${id}`,
    },
    employees: {
        getAllEmployees: '/admin/employees',
        deleteEmployee: (employeeId: string) => `admin/employee/${employeeId}`,
        addEmployee: '/admin/add-employee',
        editEmployee: (employeeId: string) => `admin/employee/${employeeId}`,
    }
}