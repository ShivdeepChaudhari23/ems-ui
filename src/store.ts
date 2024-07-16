import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import emsApiSlice from "./services/slice";
import authenticationSlice from "./slices/authenticationSlice";

export const store = configureStore({
    reducer: {
        [emsApiSlice.reducerPath]: emsApiSlice.reducer,
        authentication: authenticationSlice,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(emsApiSlice.middleware),
})

setupListeners(store.dispatch);
