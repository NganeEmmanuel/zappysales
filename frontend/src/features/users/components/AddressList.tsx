import React from 'react';
import { Grid } from '@mui/material';
import type { Address } from '../types';
import AddressCard from './AddressCard';

interface AddressListProps {
  addresses: Address[];
}

/**
 * Reusable layout component showing a list/grid of Address cards.
 */
export const AddressList: React.FC<AddressListProps> = ({ addresses }) => {
  return (
    <Grid container spacing={3}>
      {addresses.map((address) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={address.id}>
          <AddressCard address={address} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AddressList;
