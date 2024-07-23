import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { Close } from "@mui/icons-material";
import { ReactNode } from "react";
import { messages } from "../utils/messages";

interface EMSDialogProps {
    title: string;
    isDialogOpen: boolean;
    onDialogClose: () => void;
    showCloseButton?: boolean;
    showCancelButton?: boolean;
    dialogContent: ReactNode,
    onSave: () => void;
    isLoading: boolean;
    isSaveDisabled: boolean;
}

const EMSDialog = ({
    title,
    isDialogOpen,
    onDialogClose,
    showCloseButton = true,
    showCancelButton = true,
    dialogContent,
    onSave,
    isLoading,
    isSaveDisabled,
    }: EMSDialogProps) => {

        return (
            <Dialog
                open={isDialogOpen}
                onClose={onDialogClose}
            >
                <DialogTitle className="flex items-center justify-between">
                    <h3 className="text-[16px] font-bold">{title}</h3>
                    <div onClick={onDialogClose}>
                        {showCloseButton && <Close/>}
                    </div>
                </DialogTitle>
                <DialogContent className="flex justify-between items-center">
                    {dialogContent}
                </DialogContent>
                <DialogActions>
                    {showCancelButton && (
                        <Button
                            variant="outlined"
                            onClick={onDialogClose}
                        >
                            {messages.cancel}
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        onClick={onSave}
                        disabled={isLoading || isSaveDisabled}
                    >
                        {messages.save}
                    </Button>
                </DialogActions>
            </Dialog>
        );
}

export default EMSDialog;
