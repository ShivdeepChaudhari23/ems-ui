import { DeleteEmployeeAPIResponse, GetEmployeesAPIResponse, IAddEmployeeAPIResponse, IAddEmployeePayload } from "../../types";
import { API_ENDPOINTS } from "../apiEndpoints";
import emsApiSlice from "../slice";

const adminService = emsApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmployees: builder.query<GetEmployeesAPIResponse, void>({
            query: () => API_ENDPOINTS.employees.getAllEmployees,
            providesTags: ['employees']
        }),

        deletEmployee: builder.mutation<DeleteEmployeeAPIResponse, { id: string }>({
            query: ({ id }) => ({
                url: API_ENDPOINTS.employees.deleteEmployee(id),
                method: 'DELETE',
            }),
            invalidatesTags: ['employees'],
        }),

        addEmployee: builder.mutation<IAddEmployeeAPIResponse, IAddEmployeePayload>({
            query: (payload) => ({
                url: API_ENDPOINTS.employees.addEmployee,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['employees'],
        }),
    })
});

export const { useGetAllEmployeesQuery, useDeletEmployeeMutation, useAddEmployeeMutation } = adminService;
