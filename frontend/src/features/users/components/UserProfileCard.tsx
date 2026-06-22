import React from 'react';
import { Card, CardContent, Typography, Grid, Divider } from '@mui/material';
import type { User } from '../types';
import styles from './UserProfileCard.module.css';

interface UserProfileCardProps {
  user: User;
}

/**
 * Reusable component displaying the detailed profile parameters of a User.
 */
export const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <Typography variant="h5" component="h2" className={styles.title}>
          Personal Information
        </Typography>
        <Divider className={styles.divider} />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" className={styles.label}>
              FIRST NAME
            </Typography>
            <Typography variant="body1" className={styles.value}>
              {user.firstName}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" className={styles.label}>
              LAST NAME
            </Typography>
            <Typography variant="body1" className={styles.value}>
              {user.lastName}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" className={styles.label}>
              EMAIL ADDRESS
            </Typography>
            <Typography variant="body1" className={styles.value}>
              {user.email}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" className={styles.label}>
              USER ID
            </Typography>
            <Typography variant="body1" className={styles.idValue}>
              {user.id}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
