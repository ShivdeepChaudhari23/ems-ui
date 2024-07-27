export interface Employee {
    id: number,
    firstName: string,
    lastName: string,
    address?: string | null,
    salary: number,
    pincode: number,
    joiningDate: string,
    createdAt: string,
    updatedAt?: string | null,
    imageUrl?: string | null,
    emailAddress: string,
    categoryId: number,
    categoryName: string
}

export interface GetEmployeesAPIResponse {
    status: string;
    results: Employee[];
}

export interface DeleteEmployeeAPIResponse {
    status?: string;
    message?: string;
    error?: string;
}
