import React from 'react';
import { Typography, Button } from '@mui/material';
import styles from './EmptyState.module.css';

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
    <div className={styles.container}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <Typography variant="h6" className="font-semibold text-white">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" className={styles.description}>
        {description}
      </Typography>
      {actionText && onAction && (
        <Button variant="contained" color="primary" onClick={onAction} className="mt-2">
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
