import React from 'react';
import { Typography } from '@mui/material';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

/**
 * PageHeader layout for displaying page title and actions.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, action }) => {
  return (
    <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
      <div>
        <Typography variant="h4" component="h1" className="font-bold text-white">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" color="text.secondary" className="mt-1">
            {subtitle}
          </Typography>
        )}
      </div>
      {action && <div className="flex gap-2">{action}</div>}
    </div>
  );
};

export default PageHeader;
