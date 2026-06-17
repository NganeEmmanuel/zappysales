import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * A reusable modal confirmation dialog utilizing MUI Dialog.
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel
}) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle className="font-semibold">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText color="text.secondary">{message}</DialogContentText>
      </DialogContent>
      <DialogActions className="p-4">
        <Button onClick={onCancel} variant="text" color="inherit">
          {cancelText}
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error" autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
