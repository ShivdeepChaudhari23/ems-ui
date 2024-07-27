import { Button, CircularProgress, Avatar } from "@mui/material";
import { messages } from "../utils/messages";
import { useGetAllEmployeesQuery, useDeletEmployeeMutation } from "../services";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { EMSAlert, EMSDialog } from "../components";
import { Employee } from "../types";
import { Delete, Edit } from "@mui/icons-material";
import { getInitials, transformDate } from "../utils/helpers";
import { showToast } from "../Shared";

const EmployeesContainer = () => {
    const { data, isLoading: isLoadingCategories } = useGetAllEmployeesQuery();
    const [deleteEmployee] = useDeletEmployeeMutation();

    const [allEmployeesData, setAllEmployeesData] = useState<Employee[]>([]);
    const [selectedEmployeeId, setSelectedEmployeedId] = useState(-99999);
    
    const [alertMessage, setAlertMessage] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isEditing, setisEditing] = useState(false);

    useEffect(() => {
        if (data?.results) {
            setAllEmployeesData(data.results);
        }
    }, [data, isLoadingCategories]);

    const onClickDeleteCategory = (id: number) => {
        const selectedEmployee = allEmployeesData.find((employee) => employee.id === id) as Employee;
        const { firstName, lastName } = selectedEmployee;
        const alert = `Are you sure you want to delete the employee ${firstName} ${lastName}?`;
        setSelectedEmployeedId(id);
        setAlertMessage(alert);
        setShowAlert(true);
    }

    const onClickEditCategory = (id: number) => {
        // const selectedCategory = allEmployeesData.find((employee) => employee.id === id) as Category; 
        // const fieldDetails = {
        //     ...categoryFormData,
        //     name: {
        //         ...categoryFormData.name,
        //         value: selectedCategory.name || '',
        //     },
        //     description: {
        //         ...categoryFormData.description,
        //         value: selectedCategory.description || '',
        //     },
        // } as ICategoryFormConfig;

        setisEditing(true);
        // setSelectedCategoryData(fieldDetails);
        // setCategoryFormDetails(fieldDetails);
        // setSelectedCateogryId(id);
        // setIsDialogOpen(true);
        onClickDeleteCategory(id);
    }

    const handleConfirmClick = async() => {
        try {
            const response = await deleteEmployee({ id: selectedEmployeeId.toString() }).unwrap();
            if (response?.status === 'Success') {
                // ToDo: Display Success Toast
                showToast('success', 'Category deleted successfully');
            }
        } catch (e) {
            // ToDo: Display Error Toast
            showToast('error', 'Something went wrong');
        }
        setAlertMessage('');
        setShowAlert(false);
        resetData();
    }

    const resetData = () => {
        setSelectedEmployeedId(-9999);
        setisEditing(false);
    }
    const renderCustomCell = (params: GridRenderCellParams, columnName: string) => {
        console.log('#### params : %o ', params);
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
                    <Avatar src={imageUrl} alt={getInitials(firstName, lastName)} className="mt-[4px] bg-primaryBlue"/>
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
                onDialogClose={() => setIsDialogOpen(false)}
                isLoading={false}
                title={isEditing ? messages.editCategory : messages.createCategory}
                dialogContent={<></>}
                onSave={() => null}
                isSaveDisabled={false}
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
