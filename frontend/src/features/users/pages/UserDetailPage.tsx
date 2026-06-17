import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import useUsers from '../hooks/useUsers';
import UserProfileCard from '../components/UserProfileCard';
import AddressSection from '../components/AddressSection';
import UserFormDialog from '../components/UserFormDialog';
import AddressFormDialog from '../components/AddressFormDialog';
import DeleteAddressDialog from '../components/DeleteAddressDialog';
import PageHeader from '../../../shared/components/PageHeader';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import ErrorAlert from '../../../shared/components/ErrorAlert';
import EmptyState from '../../../shared/components/EmptyState';
import useAppStore from '../../../stores/appStore';
import type { Address } from '../types';

/**
 * Page view loading and rendering details of a single user along with their addresses.
 * Integrates controlled modification dialogs for profile edits and address management.
 */
export const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const showNotification = useAppStore((state) => state.showNotification);

  // User features state hooks
  const { 
    selectedUser, 
    loading, 
    error, 
    fetchUserById, 
    clearSelectedUser,
    updateUser,
    addAddress,
    updateAddress,
    deleteAddress
  } = useUsers();

  // Dialog controlled states
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isDeleteAddressOpen, setIsDeleteAddressOpen] = useState(false);
  const [addressToDeleteId, setAddressToDeleteId] = useState<string | null>(null);

  // Loading states for dialog forms
  const [savingUser, setSavingUser] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);
  const [deletingAddress, setDeletingAddress] = useState(false);

  useEffect(() => {
    if (id) {
      fetchUserById(id);
    }
    return () => {
      clearSelectedUser();
    };
  }, [id, fetchUserById, clearSelectedUser]);

  const handleBack = () => {
    navigate('/users');
  };

  const handleSaveUserProfile = async (data: { firstName: string; lastName: string }) => {
    if (!selectedUser) return;
    setSavingUser(true);
    try {
      await updateUser(selectedUser.id, data);
      showNotification('User profile updated successfully!', 'success');
      setIsEditUserOpen(false);
    } catch (err) {
      showNotification('Failed to update user profile. Please check validation rules.', 'error');
    } finally {
      setSavingUser(false);
    }
  };

  const handleSaveAddress = async (data: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }) => {
    if (!selectedUser) return;
    setSavingAddress(true);
    try {
      if (selectedAddress) {
        // Edit Mode
        await updateAddress(selectedUser.id, selectedAddress.id, data);
        showNotification('Address updated successfully!', 'success');
      } else {
        // Create Mode
        await addAddress(selectedUser.id, data);
        showNotification('Address added successfully!', 'success');
      }
      setIsAddressDialogOpen(false);
    } catch (err) {
      showNotification('Failed to save address. Please check constraints.', 'error');
    } finally {
      setSavingAddress(false);
    }
  };

  const handleConfirmDeleteAddress = async () => {
    if (!selectedUser || !addressToDeleteId) return;
    setDeletingAddress(true);
    try {
      await deleteAddress(selectedUser.id, addressToDeleteId);
      showNotification('Address deleted successfully!', 'success');
      setIsDeleteAddressOpen(false);
    } catch (err) {
      showNotification('Failed to delete address.', 'error');
    } finally {
      setDeletingAddress(false);
    }
  };

  const handleOpenAddAddress = () => {
    setSelectedAddress(null);
    setIsAddressDialogOpen(true);
  };

  const handleOpenEditAddress = (address: Address) => {
    setSelectedAddress(address);
    setIsAddressDialogOpen(true);
  };

  const handleOpenDeleteAddress = (addressId: string) => {
    setAddressToDeleteId(addressId);
    setIsDeleteAddressOpen(true);
  };

  const pageTitle = selectedUser 
    ? `${selectedUser.firstName} ${selectedUser.lastName}` 
    : 'User Details';

  return (
    <div className="flex flex-col gap-8 w-full">
      <PageHeader
        title={pageTitle}
        subtitle="Manage personal data fields and billing/shipping addresses."
        action={
          <div className="flex gap-2">
            <Button 
              variant="outlined" 
              color="primary" 
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
            >
              Back
            </Button>
            {selectedUser && (
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<EditIcon />}
                onClick={() => setIsEditUserOpen(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        }
      />

      {loading && !selectedUser ? (
        <LoadingSpinner message="Fetching user details profile..." minHeight="300px" />
      ) : error ? (
        <ErrorAlert message={error} onRetry={() => id && fetchUserById(id)} />
      ) : !selectedUser ? (
        <EmptyState
          title="User Not Found"
          description="The requested user profile could not be located in the database."
          icon={<PersonIcon />}
          actionText="Back to Directory"
          onAction={handleBack}
        />
      ) : (
        <div className="flex flex-col gap-8">
          <UserProfileCard user={selectedUser} />
          <AddressSection 
            addresses={selectedUser.addresses || []} 
            onAddAddress={handleOpenAddAddress}
            onEditAddress={handleOpenEditAddress}
            onDeleteAddress={handleOpenDeleteAddress}
          />
        </div>
      )}

      {selectedUser && (
        <>
          <UserFormDialog
            open={isEditUserOpen}
            onClose={() => setIsEditUserOpen(false)}
            onSave={handleSaveUserProfile}
            user={selectedUser}
            loading={savingUser}
          />

          <AddressFormDialog
            open={isAddressDialogOpen}
            onClose={() => setIsAddressDialogOpen(false)}
            onSave={handleSaveAddress}
            address={selectedAddress}
            loading={savingAddress}
          />

          <DeleteAddressDialog
            open={isDeleteAddressOpen}
            onClose={() => setIsDeleteAddressOpen(false)}
            onConfirm={handleConfirmDeleteAddress}
            loading={deletingAddress}
          />
        </>
      )}
    </div>
  );
};

export default UserDetailPage;
