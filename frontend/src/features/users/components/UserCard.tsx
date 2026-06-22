import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import type { User } from '../types';
import styles from './UserCard.module.css';

interface UserCardProps {
  user: User;
  onViewDetails: (id: string) => void;
}

/**
 * Reusable Card component displaying summary information of a single User.
 */
export const UserCard: React.FC<UserCardProps> = ({ user, onViewDetails }) => {
  return (
    <Card className={styles.card}>
      <CardContent>
        <Typography variant="h6" className={styles.name}>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body2" className={styles.email}>
          {user.email}
        </Typography>
        <Typography variant="caption" className={styles.addressesCount}>
          Addresses: {user.addresses?.length || 0}
        </Typography>
      </CardContent>
      <CardActions className={styles.actions}>
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
