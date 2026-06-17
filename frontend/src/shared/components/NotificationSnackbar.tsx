import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import useAppStore from '../../stores/appStore';

/**
 * Global application snackbar component displaying alert messages from appStore.
 */
export const NotificationSnackbar: React.FC = () => {
  const notification = useAppStore((state) => state.notification);
  const closeNotification = useAppStore((state) => state.closeNotification);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    closeNotification();
  };

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert 
        onClose={handleClose} 
        severity={notification.severity} 
        variant="filled" 
        sx={{ width: '100%' }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;
