import { toast } from "react-toastify"

export const showToast = (type: 'success' | 'error', message: string) => {
    toast.dismiss();
    return toast(message, { type })
}
