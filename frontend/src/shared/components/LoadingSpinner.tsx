import React from 'react';
import { CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
  minHeight?: string | number;
}

/**
 * A reusable loading spinner utilizing MUI CircularProgress.
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...', 
  minHeight = '200px' 
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 w-full"
      style={{ minHeight }}
    >
      <CircularProgress color="primary" />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </div>
  );
};

export default LoadingSpinner;
