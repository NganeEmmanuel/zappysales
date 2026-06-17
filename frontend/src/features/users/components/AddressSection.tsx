import React from 'react';
import { Typography } from '@mui/material';
import type { Address } from '../types';
import AddressList from './AddressList';
import EmptyState from '../../../shared/components/EmptyState';
import HomeIcon from '@mui/icons-material/Home';

interface AddressSectionProps {
  addresses: Address[];
}

/**
 * Section component grouping the collection of user Addresses.
 * Composes AddressList and the shared EmptyState components.
 */
export const AddressSection: React.FC<AddressSectionProps> = ({ addresses }) => {
  const hasAddresses = addresses && addresses.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h5" component="h2" className="font-semibold text-white">
        Addresses ({addresses?.length || 0})
      </Typography>
      
      {hasAddresses ? (
        <AddressList addresses={addresses} />
      ) : (
        <EmptyState
          title="No Addresses Found"
          description="This user does not have any address registered in their profile."
          icon={<HomeIcon />}
        />
      )}
    </div>
  );
};

export default AddressSection;
