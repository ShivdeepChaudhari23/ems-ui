import { Button, CircularProgress } from "@mui/material";
import { messages } from "../utils/messages";
import { Category, useAddCategoryMutation, useGetCategoriesListQuery } from "../services/admin/adminService";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { EMSDialog } from "../components";
import { ICategoryFormConfig } from "../types";
import categoryFormData from "../Config/Categories";
import CategoryFormBuilder from "../components/CategoryFormBuilder";

const CategoriesContainer = () => {
    const { data, isLoading: isLoadingCategories } = useGetCategoriesListQuery();
    const [addCategory, { isLoading: isAddingCategory }] = useAddCategoryMutation();

    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [categoryFormDetails, setCategoryFormDetails] = useState<ICategoryFormConfig>(categoryFormData);
    
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
                const payload = {
                    category: name.value as string,
                    ...(description.value ? { description: description.value as string } : {}),
                }
                const response = await addCategory(payload).unwrap();

                if (response.message) {
                    // ToDo: Display a toast
                }
            } catch (e) {
                console.log('#### ERROR : %o ', e);
            } finally {
                setCategoryFormDetails(categoryFormData);
                setIsDialogOpen(false);
            }
        }
    };
    const onDialogClose = () => {
        setCategoryFormDetails(categoryFormData);
        setIsDialogOpen(false);
    };

    const categoryColumns: GridColDef[] = [
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
                            onRowClick={(params) => console.log('#### HERE : %o ', params)}
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
                isLoading={isAddingCategory}
                title={messages.createCategory}
                dialogContent={
                    <CategoryFormBuilder
                        formDetails={categoryFormDetails}
                        onChange={onChange}
                    />
                }
                onSave={onSave}
            />
        </div>
    );
};

export default CategoriesContainer;
