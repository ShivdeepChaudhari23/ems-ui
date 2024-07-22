import { CreateCategoryPayload, CreateCategoryResponse, DeleteCategoryPayload, DeleteCategoryResponse, EditCategoryPayload, EditCategoryResponse, GetCategoriesAPIResponse } from "../../types";
import { API_ENDPOINTS } from "../apiEndpoints";
import emsApiSlice from "../slice";

const adminService = emsApiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getCategoriesList: builder.query<GetCategoriesAPIResponse, void>({
            query: () => API_ENDPOINTS.categories.getAllCategories,
            providesTags: ['categories']
        }),

        addCategory: builder.mutation<CreateCategoryResponse, CreateCategoryPayload>({
            query: (payload) => ({
                url: API_ENDPOINTS.categories.addCategory,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['categories'],
        }),

        deleteCategory: builder.mutation<DeleteCategoryResponse, DeleteCategoryPayload>({
            query: ({ categoryId }) => ({
                url: API_ENDPOINTS.categories.deleteCategory(categoryId.toString()),
                method: 'DELETE',
            }),
            invalidatesTags: ['categories'],
        }),

        editCategory: builder.mutation<EditCategoryResponse, EditCategoryPayload>({
            query: ({ id, ...paylod }) => ({
                url: API_ENDPOINTS.categories.editCategory(id.toString()),
                method: 'PUT',
                body: paylod,
            }),
            invalidatesTags: ['categories'],
        })
    })
});

export const {
    useGetCategoriesListQuery, 
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useEditCategoryMutation,
} = adminService;
