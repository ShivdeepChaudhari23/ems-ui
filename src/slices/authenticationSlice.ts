import { createSlice } from "@reduxjs/toolkit";

export interface IAuthenticationSlice {
    token: string;
}

const initialState: IAuthenticationSlice = {
    token: '',
};

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },

        resetToken: (state) => {
            state.token = '';
        }
    },
});

export const { resetToken, setToken } = authenticationSlice.actions;

export default authenticationSlice.reducer;