import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import type { Address } from '../types';

interface AddressFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }) => Promise<void>;
  address?: Address | null;
  loading?: boolean;
}

/**
 * Reusable dialog component wrapping a controlled form for creating or updating an Address.
 * Integrates backend validation limits and disables form saving when invalid.
 */
export const AddressFormDialog: React.FC<AddressFormDialogProps> = ({
  open,
  onClose,
  onSave,
  address = null,
  loading = false
}) => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const isEditMode = !!address;

  // Sync inputs on open or address prop update
  useEffect(() => {
    if (open) {
      setStreet(address?.street || '');
      setCity(address?.city || '');
      setState(address?.state || '');
      setCountry(address?.country || '');
      setPostalCode(address?.postalCode || '');
    }
  }, [open, address]);

  // Active validation checks
  const isStreetValid = street.trim().length > 0 && street.length <= 150;
  const isCityValid = city.trim().length > 0 && city.length <= 100;
  const isStateValid = state.trim().length > 0 && state.length <= 100;
  const isCountryValid = country.trim().length > 0 && country.length <= 100;
  const isPostalCodeValid = postalCode.trim().length > 0 && postalCode.length <= 20;

  const isFormValid = isStreetValid && isCityValid && isStateValid && isCountryValid && isPostalCodeValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    onSave({
      street: street.trim(),
      city: city.trim(),
      state: state.trim(),
      country: country.trim(),
      postalCode: postalCode.trim()
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="font-semibold text-white">
        {isEditMode ? 'Edit Address' : 'Add New Address'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className="flex flex-col gap-4">
          <TextField
            label="Street Address"
            variant="outlined"
            fullWidth
            required
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            disabled={loading}
            slotProps={{ htmlInput: { maxLength: 160 } }}
            error={street.length > 150}
            helperText={street.length > 150 ? 'Street address must not exceed 150 characters' : ''}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={loading}
              slotProps={{ htmlInput: { maxLength: 110 } }}
              error={city.length > 100}
              helperText={city.length > 100 ? 'City name must not exceed 100 characters' : ''}
            />
            <TextField
              label="State / Province"
              variant="outlined"
              fullWidth
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
              disabled={loading}
              slotProps={{ htmlInput: { maxLength: 110 } }}
              error={state.length > 100}
              helperText={state.length > 100 ? 'State/Province must not exceed 100 characters' : ''}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="Country"
              variant="outlined"
              fullWidth
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              disabled={loading}
              slotProps={{ htmlInput: { maxLength: 110 } }}
              error={country.length > 100}
              helperText={country.length > 100 ? 'Country name must not exceed 100 characters' : ''}
            />
            <TextField
              label="Postal Code"
              variant="outlined"
              fullWidth
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              disabled={loading}
              slotProps={{ htmlInput: { maxLength: 25 } }}
              error={postalCode.length > 20}
              helperText={postalCode.length > 20 ? 'Postal code must not exceed 20 characters' : ''}
            />
          </div>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={onClose} variant="text" color="inherit" disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isFormValid || loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddressFormDialog;
