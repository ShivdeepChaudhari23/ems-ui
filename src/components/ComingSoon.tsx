import { useEffect } from "react";
import { useGetAllEmployeesQuery } from "../services/admin/adminService";

const ComingSoon = () => {
    const { data, isLoading } = useGetAllEmployeesQuery();

    useEffect(() => {
      if (isLoading) {
        console.log('#### LOADING....');
      }
      if (data) {
        console.log('#### DATA HERHE', data);
      }
    }, [data, isLoading]);

    return (
        <div>
            <h2 className="text-red-500">Coming Soon...!</h2>
            <p>Stay Tuned...</p>
        </div>
    )
};

export default ComingSoon;
