import { API_ENDPOINTS } from "../apiEndpoints";
import emsApiSlice from "../slice";

interface Employee {
    name: string;
    email: string;
    address: string;
    salary: number;
    category_id: number;
}

interface GetEmployeesAPIResponse {
    status: string;
    result: Employee[];
}

export interface Category {
    id: number;
    name: string;
    description?: string;
}

interface GetCategoriesAPIResponse {
    status: string;
    results: Category[]
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    loginStatus: boolean;
    error?: string;
}

export interface ValidateSessionResponse {
    isSessionValid: boolean;
    error?: string;
}

export interface CreateCategoryPayload {
    category: string;
    description? : string;
}

export interface CreateCategortResponse {
    message?: string;
    status?: string;
    error?: string;
}

const adminService = emsApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmployees: builder.query<GetEmployeesAPIResponse, void>({
            query: () => API_ENDPOINTS.admin.getAllEmployees
        }),

        getCategoriesList: builder.query<GetCategoriesAPIResponse, void>({
            query: () => API_ENDPOINTS.admin.getAllCategories,
            providesTags: ['categories']
        }),

        adminLogin: builder.mutation<LoginResponse, LoginPayload>({
            query: (payload) => ({
                url: API_ENDPOINTS.admin.adminLogin,
                method: 'POST',
                body: payload,
            }),
        }),

        verifyToken: builder.query<ValidateSessionResponse, void>({
            query: () => API_ENDPOINTS.admin.verify
        }),

        addCategory: builder.mutation<CreateCategortResponse, CreateCategoryPayload>({
            query: (payload) => ({
                url: API_ENDPOINTS.admin.addCategory,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['categories'],
        }),
    })
});

export const {
    useGetAllEmployeesQuery,
    useGetCategoriesListQuery, 
    useAdminLoginMutation, 
    useVerifyTokenQuery,
    useLazyVerifyTokenQuery,
    useAddCategoryMutation,
} = adminService;
