import React from 'react';
import { Alert, AlertTitle, Button, Box } from '@mui/material';

interface ErrorAlertProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

/**
 * A reusable error alert banner utilizing MUI Alert with an optional retry button.
 */
export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title = 'Error',
  message,
  onRetry
}) => {
  return (
    <Box sx={{ width: '100%', my: 2 }}>
      <Alert 
        severity="error" 
        action={
          onRetry && (
            <Button color="inherit" size="small" onClick={onRetry}>
              Retry
            </Button>
          )
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorAlert;
