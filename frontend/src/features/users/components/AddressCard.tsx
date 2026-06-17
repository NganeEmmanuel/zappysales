import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Address } from '../types';

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
    <Card className="flex flex-col bg-[#172a45] border border-white/5 rounded-lg h-full justify-between">
      <CardContent className="p-5 flex-grow">
        <Typography variant="subtitle1" className="font-semibold text-white mb-2 truncate">
          {address.street}
        </Typography>
        <Typography variant="body2" className="text-slate-300">
          {address.city}, {address.state}
        </Typography>
        <Typography variant="body2" className="text-slate-300">
          {address.country}
        </Typography>
        <Typography variant="caption" className="text-slate-400 mt-2 block font-mono">
          Postal Code: {address.postalCode}
        </Typography>
      </CardContent>
      {(onEdit || onDelete) && (
        <CardActions className="justify-end p-2 bg-white/2">
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
