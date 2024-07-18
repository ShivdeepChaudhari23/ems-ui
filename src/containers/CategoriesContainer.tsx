import { Button, CircularProgress } from "@mui/material";
import { messages } from "../utils/messages";
import { Category, useGetCategoriesListQuery } from "../services/admin/adminService";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const CategoriesContainer = () => {
    const { data, isLoading: isLoadingCategories } = useGetCategoriesListQuery();
    const [categoryData, setCategoryData] = useState<Category[]>([]);

    useEffect(() => {
        if (data?.results) {
            setCategoryData(data.results);
        }
    }, [data, isLoadingCategories]);

    const categoryColumns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 70 },
        { field: "name", headerName: 'Category Name', width: 200,  }
    ];

    return (
        <div className='mx-8 my-4 h-[87.5vh]'>
            <div className="flex justify-between">
                <h2 className="font-bold text-[24px]">{messages.categoryTableTitle}</h2>
                <Button variant="contained" className="!bg-primaryBlue !normal-case">{messages.addCategory}</Button>
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
        </div>
    );
};

export default CategoriesContainer;
