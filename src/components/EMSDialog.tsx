import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { Close } from "@mui/icons-material";
import { ReactNode } from "react";
import { messages } from "../utils/messages";

interface EMSDialogProps {
    title: string;
    isDialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    showCloseButton?: boolean;
    showCancelButton?: boolean;
    dialogContent: ReactNode,
    onSave: () => void;
}
const EMSDialog = ({
    title,
    isDialogOpen,
    setDialogOpen,
    showCloseButton = true,
    showCancelButton = true,
    dialogContent,
    onSave,
    }: EMSDialogProps) => {
        const handleClose = () => {
            setDialogOpen(false);
        };

        return (
            <Dialog
                open={isDialogOpen}
                onClose={handleClose}
            >
                <DialogTitle className="flex items-center justify-between">
                    <h3 className="text-[16px] font-bold">{title}</h3>
                    <div onClick={handleClose}>
                        {showCloseButton && <Close/>}
                    </div>
                </DialogTitle>
                <DialogContent className="w-[39vw] h-[60vh] flex justify-between items-center">
                    {dialogContent}
                </DialogContent>
                <DialogActions>
                    {showCancelButton && (
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                        >
                            {messages.cancel}
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        onClick={onSave}
                    >
                        {messages.save}
                    </Button>
                </DialogActions>
            </Dialog>
        );
}

export default EMSDialog;
