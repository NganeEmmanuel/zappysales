import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUsers from '../hooks/useUsers';
import UserTable from '../components/UserTable';
import PageHeader from '../../../shared/components/PageHeader';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import ErrorAlert from '../../../shared/components/ErrorAlert';
import EmptyState from '../../../shared/components/EmptyState';
import GroupIcon from '@mui/icons-material/Group';

/**
 * View page loading and displaying the complete collection of User records.
 * Integrates hook-based state management, loading indicators, empty directories, and routing transitions.
 */
export const UsersPage: React.FC = () => {
  const { users, loading, error, fetchUsers } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleViewDetails = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <PageHeader 
        title="Users Directory" 
        subtitle="Manage and view all customer registration profiles and address mappings."
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
        />
      ) : (
        <UserTable users={users} onViewDetails={handleViewDetails} />
      )}
    </div>
  );
};

export default UsersPage;
