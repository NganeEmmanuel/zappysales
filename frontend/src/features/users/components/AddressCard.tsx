import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import type { Address } from '../types';

interface AddressCardProps {
  address: Address;
}

/**
 * Reusable Card component displaying details of a single Address.
 */
export const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
  return (
    <Card className="bg-[#172a45] border border-white/5 rounded-lg h-full">
      <CardContent className="p-5">
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
    </Card>
  );
};

export default AddressCard;
