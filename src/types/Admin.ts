export interface Employee {
    name: string;
    email: string;
    address: string;
    salary: number;
    category_id: number;
}

export interface GetEmployeesAPIResponse {
    status: string;
    result: Employee[];
}

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
