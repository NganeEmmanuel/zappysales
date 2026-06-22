import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Address } from '../types';
import styles from './AddressCard.module.css';

interface AddressCardProps {
  address: Address;
  onEdit?: (address: Address) => void;
  onDelete?: (addressId: string) => void;
}

/**
 * Reusable Card component displaying details of a single Address with action buttons.
 */
export const AddressCard: React.FC<AddressCardProps> = ({ address, onEdit, onDelete }) => {
  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <Typography variant="subtitle1" className={styles.street}>
          {address.street}
        </Typography>
        <Typography variant="body2" className={styles.details}>
          {address.city}, {address.state}
        </Typography>
        <Typography variant="body2" className={styles.details}>
          {address.country}
        </Typography>
        <Typography variant="caption" className={styles.postalCode}>
          Postal Code: {address.postalCode}
        </Typography>
      </CardContent>
      {(onEdit || onDelete) && (
        <CardActions className={styles.actions}>
          {onEdit && (
            <IconButton 
              size="small" 
              color="primary" 
              onClick={() => onEdit(address)}
              aria-label="edit address"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
          {onDelete && (
            <IconButton 
              size="small" 
              color="error" 
              onClick={() => onDelete(address.id)}
              aria-label="delete address"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default AddressCard;
