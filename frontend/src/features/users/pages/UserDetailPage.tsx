import React from 'react';
import { Typography, Paper, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * Placeholder view rendering user details and address management.
 */
export const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <Paper className="p-8 bg-[#172a45] rounded-lg border border-white/5">
        <Typography variant="h4" component="h1" className="font-semibold mb-4 text-white">
          User Details
        </Typography>
        <Typography variant="body1" color="text.secondary" className="mb-4">
          This is a placeholder for the User detail and Address management view. User ID: <strong>{id}</strong>
        </Typography>
        <Button variant="outlined" color="primary" onClick={() => navigate('/users')}>
          Back to Directory
        </Button>
      </Paper>
    </div>
  );
};

export default UserDetailPage;
