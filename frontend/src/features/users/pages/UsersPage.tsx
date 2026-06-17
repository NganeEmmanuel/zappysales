import React from 'react';
import { Typography, Paper } from '@mui/material';

/**
 * Placeholder view rendering the User list page.
 */
export const UsersPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <Paper className="p-8 bg-[#172a45] rounded-lg border border-white/5">
        <Typography variant="h4" component="h1" className="font-semibold mb-4 text-white">
          Users Directory
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is a placeholder for the User list page. Users and their information will be loaded here.
        </Typography>
      </Paper>
    </div>
  );
};

export default UsersPage;
