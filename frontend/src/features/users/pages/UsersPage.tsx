import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import useUsers from '../hooks/useUsers';
import UserTable from '../components/UserTable';
import UserFormDialog from '../components/UserFormDialog';
import PageHeader from '../../../shared/components/PageHeader';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import ErrorAlert from '../../../shared/components/ErrorAlert';
import EmptyState from '../../../shared/components/EmptyState';
import useAppStore from '../../../stores/appStore';

/**
 * View page loading and displaying the complete collection of User records.
 * Integrates hook-based state management, user creation dialogs, and snackbar notifications.
 */
export const UsersPage: React.FC = () => {
  const { users, loading, error, fetchUsers, createUser } = useUsers();
  const navigate = useNavigate();
  const showNotification = useAppStore((state) => state.showNotification);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [savingUser, setSavingUser] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleViewDetails = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const handleCreateUser = async (data: { firstName: string; lastName: string; email?: string }) => {
    if (!data.email) return;
    setSavingUser(true);
    try {
      await createUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      });
      showNotification('User profile created successfully!', 'success');
      setIsCreateDialogOpen(false);
    } catch (err) {
      // Error message is already handled in store, showing alert or customized snackbar
      showNotification('Failed to create user profile. Please check validation constraints.', 'error');
    } finally {
      setSavingUser(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <PageHeader 
        title="Users Directory" 
        subtitle="Manage and view all customer registration profiles and address mappings."
        action={
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={() => setIsCreateDialogOpen(true)}
          >
            Add User
          </Button>
        }
      />

      {loading ? (
        <LoadingSpinner message="Fetching user directory details..." minHeight="300px" />
      ) : error ? (
        <ErrorAlert message={error} onRetry={fetchUsers} />
      ) : !users || users.length === 0 ? (
        <EmptyState
          title="No Users Registered"
          description="It looks like there are no user profiles available in the system yet."
          icon={<GroupIcon />}
          actionText="Add User"
          onAction={() => setIsCreateDialogOpen(true)}
        />
      ) : (
        <UserTable users={users} onViewDetails={handleViewDetails} />
      )}

      <UserFormDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={handleCreateUser}
        loading={savingUser}
      />
    </div>
  );
};

export default UsersPage;
