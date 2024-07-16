import { IAuthenticationSlice } from "../slices/authenticationSlice";

const selectAuthentication = (state: { authentication: IAuthenticationSlice }): IAuthenticationSlice => state.authentication;

export default selectAuthentication;