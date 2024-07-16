import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const emsApiSlice = createApi({
    reducerPath: 'emsApiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: () => ({}),
    tagTypes: [],
});

export default emsApiSlice;