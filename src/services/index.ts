import {
    useAdminLoginMutation, 
    useVerifyTokenQuery,
    useLazyVerifyTokenQuery
} from './admin/adminService';

import {
    useGetCategoriesListQuery, 
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useEditCategoryMutation,
} from './catogories/categoriesService';

import { useDeletEmployeeMutation, useGetAllEmployeesQuery } from './employees/employeesService';

export {
    useGetAllEmployeesQuery,
    useAdminLoginMutation, 
    useVerifyTokenQuery,
    useLazyVerifyTokenQuery,
    useGetCategoriesListQuery, 
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useEditCategoryMutation,
    useDeletEmployeeMutation,
};
