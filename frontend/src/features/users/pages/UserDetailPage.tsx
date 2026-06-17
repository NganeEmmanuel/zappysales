import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useUsers from '../hooks/useUsers';
import UserProfileCard from '../components/UserProfileCard';
import AddressSection from '../components/AddressSection';
import PageHeader from '../../../shared/components/PageHeader';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import ErrorAlert from '../../../shared/components/ErrorAlert';
import EmptyState from '../../../shared/components/EmptyState';
import PersonIcon from '@mui/icons-material/Person';

/**
 * Page view loading and rendering details of a single user along with their addresses.
 */
export const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedUser, loading, error, fetchUserById, clearSelectedUser } = useUsers();

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

  const pageTitle = selectedUser 
    ? `${selectedUser.firstName} ${selectedUser.lastName}` 
    : 'User Details';

  return (
    <div className="flex flex-col gap-8 w-full">
      <PageHeader
        title={pageTitle}
        subtitle="Manage personal data fields and billing/shipping addresses."
        action={
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Back to Directory
          </Button>
        }
      />

      {loading ? (
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
          <AddressSection addresses={selectedUser.addresses || []} />
        </div>
      )}
    </div>
  );
};

export default UserDetailPage;
