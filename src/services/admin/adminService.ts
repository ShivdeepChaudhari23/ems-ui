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

interface Category {
    id: number;
    name: string;
}

interface GetCategoriesAPIResponse {
    status: string;
    result: Category[]
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

const adminService = emsApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmployees: builder.query<GetEmployeesAPIResponse[], void>({
            query: () => API_ENDPOINTS.admin.getAllEmployees
        }),

        getCategoriesList: builder.query<GetCategoriesAPIResponse[], void>({
            query: () => API_ENDPOINTS.admin.getAllCategories
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
        })
    })
});

export const {
    useGetAllEmployeesQuery,
    useGetCategoriesListQuery, 
    useAdminLoginMutation, 
    useVerifyTokenQuery  
} = adminService;
