import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const emsApiSlice = createApi({
    reducerPath: 'emsApiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        credentials: "include",
        prepareHeaders: (headers) => {
            const token = Cookies.get('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: () => ({}),
    tagTypes: [
        'categories',
    ],
});

export default emsApiSlice;