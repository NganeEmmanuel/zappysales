import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * Placeholder view rendering user details and address management.
 */
export const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Paper sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          User Details
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          This is a placeholder for the User detail and Address management view. User ID: <strong>{id}</strong>
        </Typography>
        <Button variant="outlined" color="primary" onClick={() => navigate('/users')}>
          Back to Directory
        </Button>
      </Paper>
    </Box>
  );
};

export default UserDetailPage;
