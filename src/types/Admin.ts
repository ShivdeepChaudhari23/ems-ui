export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    loginStatus: boolean;
    error?: string;
}

export interface ValidateSessionResponse {
    isSessionValid: boolean;
    error?: string;
}
