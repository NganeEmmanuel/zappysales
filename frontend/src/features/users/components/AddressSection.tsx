import React from 'react';
import { Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { Address } from '../types';
import AddressList from './AddressList';
import EmptyState from '../../../shared/components/EmptyState';
import HomeIcon from '@mui/icons-material/Home';

interface AddressSectionProps {
  addresses: Address[];
  onEditAddress?: (address: Address) => void;
  onDeleteAddress?: (addressId: string) => void;
  onAddAddress?: () => void;
}

/**
 * Section component grouping the collection of user Addresses.
 * Composes AddressList and the shared EmptyState components, exposing creation/modification callbacks.
 */
export const AddressSection: React.FC<AddressSectionProps> = ({ 
  addresses, 
  onEditAddress, 
  onDeleteAddress, 
  onAddAddress 
}) => {
  const hasAddresses = addresses && addresses.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Typography variant="h5" component="h2" className="font-semibold text-white">
          Addresses ({addresses?.length || 0})
        </Typography>
        {onAddAddress && (
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={onAddAddress}
            size="small"
          >
            Add Address
          </Button>
        )}
      </div>
      
      {hasAddresses ? (
        <AddressList 
          addresses={addresses} 
          onEditAddress={onEditAddress}
          onDeleteAddress={onDeleteAddress}
        />
      ) : (
        <EmptyState
          title="No Addresses Found"
          description="This user does not have any address registered in their profile."
          icon={<HomeIcon />}
          actionText={onAddAddress ? "Add Address" : undefined}
          onAction={onAddAddress}
        />
      )}
    </div>
  );
};

export default AddressSection;
