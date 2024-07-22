import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { Close } from "@mui/icons-material";

import { messages } from "../utils/messages";

interface EMSAlertProps {
    title: string;
    isDialogOpen: boolean;
    onDialogClose: () => void;
    onConfirm: () => void;
    message: string;
}
const EMSAlert = ({
    title,
    isDialogOpen,
    onDialogClose,
    message,
    onConfirm,
    }: EMSAlertProps) => {

        return (
            <Dialog
                open={isDialogOpen}
                onClose={onDialogClose}
            >
                <DialogTitle className="flex items-center justify-between">
                    <h3 className="text-[16px] font-bold">{title}</h3>
                    <div onClick={onDialogClose}>
                        <Close/>
                    </div>
                </DialogTitle>
                <DialogContent className="overflow-hidden flex justify-between items-center">
                    <p className="w-max-[39vw]">{message}</p>
                </DialogContent>
                <DialogActions>
                        <Button
                            variant="contained"
                            onClick={onConfirm}
                        >
                            {messages.yes}
                        </Button>
                    <Button
                        variant="outlined"
                        onClick={onDialogClose}
                    >
                        {messages.no}
                    </Button>
                </DialogActions>
            </Dialog>
        );
}

export default EMSAlert;
