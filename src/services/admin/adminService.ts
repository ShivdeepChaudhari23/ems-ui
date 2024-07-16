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
const adminService = emsApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmployees: builder.query<GetEmployeesAPIResponse[], void>({
            query: () => API_ENDPOINTS.admin.getAllEmployees
        }),

        getCategoriesList: builder.query<GetCategoriesAPIResponse[], void>({
            query: () => API_ENDPOINTS.admin.getAllCategories
        }),
    })
});

export const {
    useGetAllEmployeesQuery,
    useGetCategoriesListQuery,    
} = adminService;
