import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import type { User } from '../types';

interface UserFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { firstName: string; lastName: string; email?: string }) => Promise<void>;
  user?: User | null;
  loading?: boolean;
}

/**
 * Reusable dialog component wrapping a controlled form for creating or updating a User.
 * Mirrors backend validations and disables submission when invalid.
 */
export const UserFormDialog: React.FC<UserFormDialogProps> = ({
  open,
  onClose,
  onSave,
  user = null,
  loading = false,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const isEditMode = !!user;

  // Sync inputs on open or user prop mutation
  useEffect(() => {
    if (open) {
      setFirstName(user?.firstName || '');
      setLastName(user?.lastName || '');
      setEmail(user?.email || '');
    }
  }, [open, user]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Active validation checks
  const isFirstNameValid = firstName.trim().length > 0 && firstName.length <= 50;
  const isLastNameValid = lastName.trim().length > 0 && lastName.length <= 50;
  const isEmailValid = isEditMode || (email.trim().length > 0 && email.length <= 100 && emailRegex.test(email));

  const isFormValid = isFirstNameValid && isLastNameValid && isEmailValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const payload = isEditMode
      ? { firstName: firstName.trim(), lastName: lastName.trim() }
      : { firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() };

    onSave(payload);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle className="font-semibold text-white">
        {isEditMode ? 'Edit User Profile' : 'Create User Profile'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className="flex flex-col gap-4">
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={loading}
            slotProps={{ htmlInput: { maxLength: 55 } }}
            error={firstName.length > 50}
            helperText={firstName.length > 50 ? 'First name must not exceed 50 characters' : ''}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={loading}
            slotProps={{ htmlInput: { maxLength: 55 } }}
            error={lastName.length > 50}
            helperText={lastName.length > 50 ? 'Last name must not exceed 50 characters' : ''}
          />
          {!isEditMode && (
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              slotProps={{ htmlInput: { maxLength: 105 } }}
              error={email.length > 100 || (email.length > 0 && !emailRegex.test(email))}
              helperText={
                email.length > 100
                  ? 'Email must not exceed 100 characters'
                  : email.length > 0 && !emailRegex.test(email)
                  ? 'Must be a valid email address'
                  : ''
              }
            />
          )}
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

export default UserFormDialog;
