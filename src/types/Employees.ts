import { IDropdownOption } from "../types";

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

export interface IEmployeeFieldType {
    key: string;
    label: string;
    error?: boolean;
    errorMessage?: string;
    required?: boolean;
    value: string | number;
    type: 'date' | 'dropdown' | 'text' | 'number';
    options?: IDropdownOption[];
    dropdownId?: string;
}

export interface IEmployeeFormType {
    firstName: IEmployeeFieldType;
    lastName: IEmployeeFieldType;
    address: IEmployeeFieldType;
    salary: IEmployeeFieldType;
    pincode: IEmployeeFieldType;
    joiningDate: IEmployeeFieldType;
    // imageUrl: IEmployeeFieldType;
    emailAddress: IEmployeeFieldType;
    phoneNumber: IEmployeeFieldType;
    category: IEmployeeFieldType;
}
