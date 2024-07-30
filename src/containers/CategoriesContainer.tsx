import { Button, CircularProgress } from "@mui/material";
import { messages } from "../utils/messages";
import { useAddCategoryMutation, useDeleteCategoryMutation, useEditCategoryMutation, useGetCategoriesListQuery } from "../services";
import { useEffect, useMemo, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { EMSAlert, EMSDialog, CategoryFormBuilder } from "../components";
import { Category, CreateCategoryPayload, EditCategoryPayload, ICategoryFormConfig } from "../types";
import categoryFormData from "../Config/Categories";
import { Delete, Edit } from "@mui/icons-material";
import { showToast } from "../Shared";

const CategoriesContainer = () => {
    const { data, isLoading: isLoadingCategories } = useGetCategoriesListQuery();
    const [addCategory, { isLoading: isAddingCategory }] = useAddCategoryMutation();
    const [editCategory, { isLoading: isEditingCategory }] = useEditCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [categoryFormDetails, setCategoryFormDetails] = useState<ICategoryFormConfig>(categoryFormData);
    const [selectedCategoryData, setSelectedCategoryData] = useState<ICategoryFormConfig>(categoryFormData);
    const [selectedCategoryId, setSelectedCateogryId] = useState<number>(-9999);
    
    const [alertMessage, setAlertMessage] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isEditing, setisEditing] = useState(false);

    useEffect(() => {
        if (data?.results) {
            setCategoryData(data.results);
        }
    }, [data, isLoadingCategories]);

    const onChange = (fieldName: string, value: string) => {
        setCategoryFormDetails((prev) => {
            const fieldData = prev[fieldName as keyof ICategoryFormConfig];
            return { ...prev, [fieldName]: { ...fieldData, value, error: false } };
        })
    };

    const isFieldsInvalid = () => {
        const { name } = categoryFormDetails;
        if (!name.value) {
            setCategoryFormDetails((prev) => ({ ...prev, name: { ...prev.name, error: true } }));
            return true;
        }
        return false;
    };

    const onSave = async () => {
        if (!isFieldsInvalid()) {
            const { name, description } = categoryFormDetails;
            try {
                let payload = {};
                if (isEditing) {
                    payload = {
                        id: selectedCategoryId,
                        ...(name.value !== selectedCategoryData.name.value && { name: name.value }),
                        ...(description.value !== selectedCategoryData.description.value && { description: description.value }),
                    }
                } else {
                    payload = {
                        category: name.value as string,
                        ...(description.value ? { description: description.value as string } : {}),
                    }
                }

                const response = await (isEditing ? editCategory(payload as EditCategoryPayload) : addCategory(payload as CreateCategoryPayload)).unwrap();

                if (response.message) {
                    showToast('success', response.message)
                }
            } catch (e) {
                showToast('error', 'Something went wrong');
            } finally {
                setCategoryFormDetails(categoryFormData);
                setIsDialogOpen(false);
                resetData();
            }
        }
    };
    const onDialogClose = () => {
        setCategoryFormDetails(categoryFormData);
        setIsDialogOpen(false);
    };

    const onClickDeleteCategory = (id: number) => {
        const selectedCategory = categoryData.find((category) => category.id === id) as Category; 
        const alert = `All the roles and employees associated with this category will also be deleted. Are you sure you want to delete the category ${selectedCategory.name}?`;
        setSelectedCateogryId(id);
        setAlertMessage(alert);
        setShowAlert(true);
    }

    const handleConfirmClick = async() => {
        try {
            const response = await deleteCategory({ categoryId: selectedCategoryId }).unwrap();
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
        setCategoryFormDetails(categoryFormData);
        setSelectedCateogryId(-9999);
        setSelectedCategoryData(categoryFormData);
        setisEditing(false);
    }
    const onClickEditCategory = (id: number) => {
        const selectedCategory = categoryData.find((category) => category.id === id) as Category; 
        const fieldDetails = {
            ...categoryFormData,
            name: {
                ...categoryFormData.name,
                value: selectedCategory.name || '',
            },
            description: {
                ...categoryFormData.description,
                value: selectedCategory.description || '',
            },
        } as ICategoryFormConfig;

        setisEditing(true);
        setSelectedCategoryData(fieldDetails);
        setCategoryFormDetails(fieldDetails);
        setSelectedCateogryId(id);
        setIsDialogOpen(true);
    }

    const isSaveDisabled = useMemo(() => {
        if (isEditing) {
            return JSON.stringify(selectedCategoryData) === JSON.stringify(categoryFormDetails);
        } else {
            false;
        }
    },[isEditing, categoryFormDetails, selectedCategoryData]) as boolean;

    const renderCustomCell = (params: GridRenderCellParams, columnName: string) => {
        switch (columnName){
            case 'delete':
                return (
                    <Delete className="fill-current text-primaryBlue hover:text-text" onClick={() => onClickDeleteCategory(params.id as number)}/>
                );
            case 'edit':
                return (
                    <Edit className="fill-current text-primaryBlue hover:text-text" onClick={() => onClickEditCategory(params.id as number)}/>
                )
        }
        
    };

    const categoryColumns: GridColDef[] = [
        { field: 'edit', headerName: '', renderCell: (params) => renderCustomCell(params, 'edit'), width: 5 },
        { field: 'delete', headerName: '', renderCell: (params) => renderCustomCell(params, 'delete'), width: 5 },
        { field: 'id', headerName: 'Id', width: 70 },
        { field: "name", headerName: 'Category Name', width: 200 },
        { field: "description", headerName: 'Description', width: 500 }
    ];

    return (
        <div className='mx-8 my-4 h-[87.5vh]'>
            <div className="flex justify-between">
                <h2 className="font-bold text-[24px]">{messages.categoryTableTitle}</h2>
                <Button
                    variant="contained"
                    className="!bg-primaryBlue !normal-case"
                    onClick={() => setIsDialogOpen(true)}
                >
                    {messages.addCategory}
                </Button>
            </div> 
            <div className="w-full h-[90%] flex justify-center items-center mt-4">
                {isLoadingCategories ? (
                            <div>
                                <CircularProgress />
                            </div>
                    ) : (categoryData && categoryData.length) > 0 ? (
                        <DataGrid
                            columns={categoryColumns}
                            rows={categoryData}
                        />
                    ) : (
                        <div>
                            <h3 className="font-bold text-[16px]">{messages.noCategories}</h3>
                        </div>
                    )}
            </div>
            <EMSDialog
                isDialogOpen={isDialogOpen}
                onDialogClose={onDialogClose}
                isLoading={isAddingCategory || isEditingCategory}
                title={isEditing ? messages.editCategory : messages.createCategory}
                dialogContent={
                    <CategoryFormBuilder
                        formDetails={categoryFormDetails}
                        onChange={onChange}
                    />
                }
                onSave={onSave}
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

export default CategoriesContainer;
