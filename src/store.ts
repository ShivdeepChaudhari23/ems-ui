import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import emsApiSlice from "./services/slice";
import authenticationSlice from "./slices/authenticationSlice";
import Cookies from "js-cookie";
import { validateToken } from "./utils/helpers";

const tokenMiddleware = store => next => action => {
    if (action.type.startsWith('emsApiSlice/')) {
      const token = Cookies.get('token') as string;
      if (!validateToken(token)) {
        store.dispatch({ type: 'authentication/resetToken' });
        Cookies.remove('token');
        return;
      }
    }
  
    return next(action);
};

export const store = configureStore({
    reducer: {
        [emsApiSlice.reducerPath]: emsApiSlice.reducer,
        authentication: authenticationSlice,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(emsApiSlice.middleware).concat(tokenMiddleware),
})

setupListeners(store.dispatch);
