import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

/**
 * Placeholder view rendering the User list page.
 */
export const UsersPage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Paper sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Users Directory
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is a placeholder for the User list page. Users and their information will be loaded here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default UsersPage;
