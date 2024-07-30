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
    disabled?: boolean;
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

export interface IAddEmployeePayload {
    firstName: string;
    lastName:  string;
    address?: string;
    salary: number;
    emailAddress: string;
    pincode: number;
    joiningDate: number;
    imageUrl?: string;
    categoryId: number;
}

export interface IAddEmployeeAPIResponse {
    error?: string;
    message?: string;
    status?: string;
}

export interface IEditEmployeePayload {
    employeeId: string;
    firstName?: string;
    lastName?:  string;
    address?: string;
    salary?: number;
    emailAddress?: string;
    pincode?: number;
    imageUrl?: string;
    categoryId?: number;
}
