import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

/**
 * EmptyState display rendering descriptive texts and action buttons.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionText,
  onAction
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 6,
        textAlign: 'center',
        border: '2px dashed rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
        bgcolor: 'background.paper',
        my: 4,
        gap: 2
      }}
    >
      {icon && <Box sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.8 }}>{icon}</Box>}
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxW: '400px' }}>
        {description}
      </Typography>
      {actionText && onAction && (
        <Button variant="contained" color="primary" onClick={onAction} sx={{ mt: 1 }}>
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
