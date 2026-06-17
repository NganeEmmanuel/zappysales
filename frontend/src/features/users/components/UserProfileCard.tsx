import React from 'react';
import { Card, CardContent, Typography, Grid, Divider } from '@mui/material';
import type { User } from '../types';

interface UserProfileCardProps {
  user: User;
}

/**
 * Reusable component displaying the detailed profile parameters of a User.
 */
export const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  return (
    <Card className="bg-[#172a45] border border-white/5 rounded-lg">
      <CardContent className="p-6">
        <Typography variant="h5" component="h2" className="font-semibold text-white mb-4">
          Personal Information
        </Typography>
        <Divider className="bg-white/10 mb-6" />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" className="text-slate-400 block mb-1">
              FIRST NAME
            </Typography>
            <Typography variant="body1" className="text-white font-medium">
              {user.firstName}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" className="text-slate-400 block mb-1">
              LAST NAME
            </Typography>
            <Typography variant="body1" className="text-white font-medium">
              {user.lastName}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" className="text-slate-400 block mb-1">
              EMAIL ADDRESS
            </Typography>
            <Typography variant="body1" className="text-white font-medium">
              {user.email}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" className="text-slate-400 block mb-1">
              USER ID
            </Typography>
            <Typography variant="body1" className="text-slate-400 font-mono break-all text-xs">
              {user.id}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
