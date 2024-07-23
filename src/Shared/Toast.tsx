import { toast } from "react-toastify"
// import { Close } from "@mui/icons-material";

export const showToast = (type: 'success' | 'error', message: string) => {
    toast.dismiss();
    return toast(message, { type })
}
