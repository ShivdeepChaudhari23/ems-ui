import { GetEmployeesAPIResponse, LoginResponse, LoginPayload, ValidateSessionResponse } from "../../types";
import { API_ENDPOINTS } from "../apiEndpoints";
import emsApiSlice from "../slice";

const adminService = emsApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmployees: builder.query<GetEmployeesAPIResponse, void>({
            query: () => API_ENDPOINTS.admin.getAllEmployees
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
    })
});

export const {
    useGetAllEmployeesQuery,
    useAdminLoginMutation, 
    useVerifyTokenQuery,
    useLazyVerifyTokenQuery,
} = adminService;
