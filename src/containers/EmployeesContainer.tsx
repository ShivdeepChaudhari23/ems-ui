import { Button, CircularProgress, Avatar } from "@mui/material";
import { messages } from "../utils/messages";
import {
    useGetAllEmployeesQuery,
    useDeletEmployeeMutation,
    useGetCategoriesListQuery,
    useAddEmployeeMutation,
    useEditEmployeeMutation
} from "../services";
import { useEffect, useMemo, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { EMSAlert, EMSDialog, EmployeeFormBuilder } from "../components";
import { Employee, IAddEmployeePayload, IEditEmployeePayload, IEmployeeFormType } from "../types";
import { Delete, Edit } from "@mui/icons-material";
import { getInitials, transformDate, transformOptions } from "../utils/helpers";
import { showToast } from "../Shared";
import { EMPLOYEE_FORM_DEFAULT_DATA } from "../Config/Employee";

const EmployeesContainer = () => {
    const { data, isLoading: isLoadingCategories } = useGetAllEmployeesQuery();
    const { data: categoriesData } = useGetCategoriesListQuery();

    const  [addEmployee] = useAddEmployeeMutation();
    const [editEmployee] = useEditEmployeeMutation();
    const [deleteEmployee] = useDeletEmployeeMutation();

    const [allEmployeesData, setAllEmployeesData] = useState<Employee[]>([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(-99999);
    
    const [employeeForm, setEmployeeForm] = useState<IEmployeeFormType>(EMPLOYEE_FORM_DEFAULT_DATA);
    const [selectedEmployeeForm, setSelectedEmployeeForm] = useState<IEmployeeFormType>(EMPLOYEE_FORM_DEFAULT_DATA);
    const [alertMessage, setAlertMessage] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isEditing, setisEditing] = useState(false);

    useEffect(() => {
        if (data?.results) {
            setAllEmployeesData(data.results);
        }
    }, [data, isLoadingCategories]);

    useEffect(() => {
        if (categoriesData?.results && categoriesData.results.length > 0) {
            const categoryOptions = categoriesData.results.map(transformOptions);
            setEmployeeForm((prev) => ({ ...prev, category: { ...prev.category, options: categoryOptions } }));
        }
    }, [categoriesData]);

    const isSaveDisabled = useMemo(() => isEditing && JSON.stringify(employeeForm) === JSON.stringify(selectedEmployeeForm), [selectedEmployeeForm, employeeForm, isEditing]);
    
    const onClickDeleteCategory = (id: number) => {
        const selectedEmployee = allEmployeesData.find((employee) => employee.id === id) as Employee;
        const { firstName, lastName } = selectedEmployee;
        const alert = `Are you sure you want to delete the employee ${firstName} ${lastName}?`;
        setSelectedEmployeeId(id);
        setAlertMessage(alert);
        setShowAlert(true);
    }

    const isFormInvalid = () => {
        let formData = employeeForm;
        let isError = false;
        
        for (const key in formData) {
            const fieldData = formData[key as keyof IEmployeeFormType];
            const isFieldInvalid = !!fieldData.required && !fieldData.value;
            formData = { ...formData, [key]: { ...fieldData, error: isFieldInvalid } };
            isError = isError || isFieldInvalid;
        }
        setEmployeeForm(formData);
        return isError;
    };

    const handleChange = (key: string, value: string | number, id?: string) => {
        setEmployeeForm((prev) => {
            const fieldData = prev[key as keyof IEmployeeFormType];
            if (key === 'category' && id) return { ...prev, [key]: { ...fieldData, value, error: false, dropdownId: id } };

            return { ...prev, [key]: { ...fieldData, value: (['salary', 'pincode'].includes(key) ? parseInt(value as string) : value), error: false } }
        })
    };

    const handleSubmit = async () => {
        if (!isFormInvalid()) {
            try {
                let payload: IAddEmployeePayload | IEditEmployeePayload = {};
                if (isEditing) {
                    const { firstName, lastName, emailAddress, address, pincode, category, salary } = selectedEmployeeForm;
                    payload = {
                        employeeId: selectedEmployeeId.toString(),
                        ...(firstName.value !== employeeForm.firstName.value && { firstName: employeeForm.firstName.value as string}),
                        ...(lastName.value !== employeeForm.lastName.value && { lastName: employeeForm.lastName.value as string}),
                        ...(emailAddress.value !== employeeForm.emailAddress.value && { emailAddress: employeeForm.emailAddress.value as string}),
                        ...(address.value !== employeeForm.address.value && { emailAddress: employeeForm.address.value as string}),
                        ...(pincode.value !== employeeForm.pincode.value && { pincode: parseInt(employeeForm.pincode.value as string)}),
                        ...(category.dropdownId !== employeeForm.category.dropdownId && { categoryId: employeeForm.category.dropdownId}),
                        ...(salary.value !== employeeForm.salary.value && { salary: parseInt(employeeForm.salary.value as string)}),
                    }
                } else {
                    const { firstName, lastName, emailAddress, address, pincode, category, salary, joiningDate } = employeeForm;
                    payload = {
                        firstName: firstName.value as string,
                        lastName: lastName.value as string,
                        salary: parseInt(salary.value as string),
                        emailAddress: emailAddress.value as string,
                        pincode: parseInt(pincode.value as string),
                        joiningDate: new Date(joiningDate.value as string).getTime(),
                        categoryId: parseInt(category.dropdownId as string),
                        ...(address.value && { address: address.value as string }),
                    };
                }
                const response = await (isEditing ? editEmployee(payload as IEditEmployeePayload) : addEmployee(payload as IAddEmployeePayload)).unwrap();
                if (response.message) {
                    showToast('success', response.message);
                }
            } catch (e) {
                showToast('error', e.data.error as string);
            }
            resetData();
        }
    };

    const onClickEditCategory = (id: number) => {
        const selectedEmployee = allEmployeesData.find((employee) => employee.id === id) as Employee; 
        const { firstName, lastName, emailAddress, address = '', pincode, categoryId, categoryName, salary, joiningDate } = selectedEmployee;
        const selectedEmployeeFormData = {
            ...employeeForm,
            firstName: {
                ...employeeForm.firstName,
                value: firstName,
            },
            lastName: {
                ...employeeForm.lastName,
                value: lastName,
            },
            emailAddress: {
                ...employeeForm.emailAddress,
                value: emailAddress,
            },
            address: {
                ...employeeForm.address,
                value: address || '',
            },
            pincode: {
                ...employeeForm.pincode,
                value: pincode,
            },
            category: {
                ...employeeForm.category,
                value: categoryName,
                dropdownId: categoryId.toString(),
            },
            salary: {
                ...employeeForm.salary,
                value: salary,
            },
            joiningDate: {
                ...employeeForm.joiningDate,
                value: joiningDate,
                disabled: true,
            }
        };

        setisEditing(true);
        setSelectedEmployeeForm(selectedEmployeeFormData);
        setEmployeeForm(selectedEmployeeFormData);
        setSelectedEmployeeId(id);
        setIsDialogOpen(true);
    }

    const handleConfirmClick = async() => {
        try {
            const response = await deleteEmployee({ id: selectedEmployeeId.toString() }).unwrap();
            if (response?.status === 'Success') {
                showToast('success', 'Category deleted successfully');
            }
        } catch (e) {
            showToast('error', 'Something went wrong');
        }
        setAlertMessage('');
        setShowAlert(false);
        resetData();
    }

    const resetData = () => {
        setEmployeeForm((prev) => ({ ...EMPLOYEE_FORM_DEFAULT_DATA, category: { ...EMPLOYEE_FORM_DEFAULT_DATA.category, options: prev.category.options } }));
        setSelectedEmployeeId(-9999);
        setisEditing(false);
        setIsDialogOpen(false);
    }

    const renderCustomCell = (params: GridRenderCellParams, columnName: string) => {
        const { firstName, lastName, joiningDate, imageUrl } = params.row;

        switch (columnName){
            case 'delete':
                return (
                    <Delete className="fill-current text-primaryBlue hover:text-text" onClick={() => onClickDeleteCategory(params.id as number)}/>
                );
            case 'edit':
                return (
                    <Edit className="fill-current text-primaryBlue hover:text-text" onClick={() => onClickEditCategory(params.id as number)}/>
                )
            case 'name':
                return (
                    <p>{`${firstName} ${lastName}`}</p>
                )
            case 'joiningDate':
                return (
                    <p>{`${transformDate(joiningDate)}`}</p>
                )
            case 'avatar':
                return (
                    <Avatar src={imageUrl} alt={getInitials(firstName, lastName)} className="mt-[4px]" />
                )
        }
        
    };

    const employeesColumns: GridColDef[] = [
        { field: 'edit', headerName: '', renderCell: (params) => renderCustomCell(params, 'edit'), width: 5 },
        { field: 'delete', headerName: '', renderCell: (params) => renderCustomCell(params, 'delete'), width: 5 },
        { field: 'id', headerName: 'Id', width: 70 },
        { field: 'image', headerName: '', renderCell: (params) => renderCustomCell(params, 'avatar'), width: 20 },
        { field: "name", headerName: 'Employee Name', width: 200, renderCell: (params) => renderCustomCell(params, 'name') },
        { field: "address", headerName: 'Address', width: 300 },
        { field: "salary", headerName: 'Salary', width: 100 },
        { field: 'joiningDate', headerName: 'Joined on', width: 150, renderCell: (params) => renderCustomCell(params, 'joiningDate') },
        { field: 'categoryName', headerName: 'Department', width: 100 },
    ];

    return (
        <div className='mx-8 my-4 h-[87.5vh]'>
            <div className="flex justify-between">
                <h2 className="font-bold text-[24px]">{messages.employees}</h2>
                <Button
                    variant="contained"
                    className="!bg-primaryBlue !normal-case"
                    onClick={() => setIsDialogOpen(true)}
                >
                    {messages.addEmployee}
                </Button>
            </div> 
            <div className="w-full h-[90%] flex justify-center items-center mt-4">
                {isLoadingCategories ? (
                            <div>
                                <CircularProgress />
                            </div>
                    ) : (allEmployeesData && allEmployeesData.length) > 0 ? (
                        <DataGrid
                            columns={employeesColumns}
                            rows={allEmployeesData}
                        />
                    ) : (
                        <div>
                            <h3 className="font-bold text-[16px]">{messages.noCategories}</h3>
                        </div>
                    )}
            </div>
            <EMSDialog
                isDialogOpen={isDialogOpen}
                onDialogClose={() => resetData()}
                isLoading={false}
                title={isEditing ? messages.editEmployee : messages.addEmployee}
                dialogContent={<EmployeeFormBuilder formFields={employeeForm} onChange={handleChange}/>}
                onSave={() => handleSubmit()}
                isSaveDisabled={isSaveDisabled}
            />
            <EMSAlert
                isDialogOpen={showAlert}
                onDialogClose={() => setShowAlert(false)}
                title={messages.confirmation}
                message={alertMessage}
                onConfirm={() => handleConfirmClick()}
            />
        </div>
    );
};

export default EmployeesContainer;
