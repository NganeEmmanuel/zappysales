import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface DeleteAddressDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading?: boolean;
}

/**
 * Reusable dialog confirming user intent to delete an address profile.
 */
export const DeleteAddressDialog: React.FC<DeleteAddressDialogProps> = ({
  open,
  onClose,
  onConfirm,
  loading = false
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="font-semibold text-white">Delete Address</DialogTitle>
      <DialogContent>
        <DialogContentText color="text.secondary">
          Are you sure you want to delete this address? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions className="p-4">
        <Button onClick={onClose} variant="text" color="inherit" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error" disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAddressDialog;
