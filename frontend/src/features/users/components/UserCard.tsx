import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import type { User } from '../types';

interface UserCardProps {
  user: User;
  onViewDetails: (id: string) => void;
}

/**
 * Reusable Card component displaying summary information of a single User.
 */
export const UserCard: React.FC<UserCardProps> = ({ user, onViewDetails }) => {
  return (
    <Card className="flex flex-col h-full justify-between bg-[#172a45] border border-white/5">
      <CardContent>
        <Typography variant="h6" className="font-semibold text-white truncate mb-2">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body2" className="text-slate-400 mb-4 truncate">
          {user.email}
        </Typography>
        <Typography variant="caption" className="text-slate-500">
          Addresses: {user.addresses?.length || 0}
        </Typography>
      </CardContent>
      <CardActions className="p-4 pt-0">
        <Button 
          variant="contained" 
          color="primary" 
          size="small" 
          fullWidth
          onClick={() => onViewDetails(user.id)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
