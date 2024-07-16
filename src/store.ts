import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import emsApiSlice from "./services/slice";

export const store = configureStore({
    reducer: {
        [emsApiSlice.reducerPath]: emsApiSlice.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(emsApiSlice.middleware),
})

setupListeners(store.dispatch);
