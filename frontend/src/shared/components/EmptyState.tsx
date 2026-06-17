import React from 'react';
import { Typography, Button } from '@mui/material';

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
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-white/10 rounded-lg bg-[#172a45] my-8 gap-4">
      {icon && <div className="text-[48px] text-slate-400 opacity-80">{icon}</div>}
      <Typography variant="h6" className="font-semibold text-white">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" className="max-w-[400px]">
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
