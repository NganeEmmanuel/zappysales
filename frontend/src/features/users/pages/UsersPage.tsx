import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, TablePagination, InputAdornment, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import GroupIcon from '@mui/icons-material/Group';
import useUsers from '../hooks/useUsers';
import UserTable from '../components/UserTable';
import UserFormDialog from '../components/UserFormDialog';
import PageHeader from '../../../shared/components/PageHeader';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import ErrorAlert from '../../../shared/components/ErrorAlert';
import EmptyState from '../../../shared/components/EmptyState';
import useAppStore from '../../../stores/appStore';

import styles from './UsersPage.module.css';

/**
 * View page loading and displaying the complete collection of User records.
 * Integrates server-side pagination, search filters, loading states, and creation dialogs.
 */
export const UsersPage: React.FC = () => {
  const { 
    users, 
    loading, 
    error, 
    currentPage,
    pageSize,
    searchTerm,
    totalElements,
    fetchUsers, 
    createUser 
  } = useUsers();

  const navigate = useNavigate();
  const showNotification = useAppStore((state) => state.showNotification);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [savingUser, setSavingUser] = useState(false);
  const [searchVal, setSearchVal] = useState(searchTerm);

  // Sync searchVal with global store searchTerm on back navigation
  useEffect(() => {
    setSearchVal(searchTerm);
  }, [searchTerm]);

  // Initial load on mount
  useEffect(() => {
    fetchUsers(0, 10, "");
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
      // Refresh paginated users list
      fetchUsers(currentPage, pageSize, searchTerm);
    } catch (err) {
      showNotification('Failed to create user profile. Please check validation constraints.', 'error');
    } finally {
      setSavingUser(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Initiating a search resets the page index to 0
    fetchUsers(0, pageSize, searchVal.trim());
  };

  const handleClearSearch = () => {
    setSearchVal('');
    fetchUsers(0, pageSize, '');
  };

  const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    fetchUsers(newPage, pageSize, searchTerm);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newSize = parseInt(event.target.value, 10);
    // Page resets to 0 when size changes
    fetchUsers(0, newSize, searchTerm);
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

      {/* Search Input Control */}
      <form onSubmit={handleSearchSubmit} className="flex gap-4 w-full max-w-md">
        <TextField
          variant="outlined"
          placeholder="Search name or email..."
          size="small"
          fullWidth
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-slate-400" />
                </InputAdornment>
              ),
              endAdornment: searchVal && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClearSearch}>
                    <ClearIcon fontSize="small" className="text-slate-400" />
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
          disabled={loading}
        />
        <Button 
          type="submit" 
          variant="outlined" 
          color="primary" 
          size="small"
          disabled={loading}
        >
          Search
        </Button>
      </form>

      {/* Result Count display */}
      {totalElements > 0 && (
        <div className="text-sm text-slate-400">
          Found {totalElements} users matching your criteria.
        </div>
      )}

      {loading ? (
        <LoadingSpinner message="Fetching user directory details..." minHeight="300px" />
      ) : error ? (
        <ErrorAlert message={error} onRetry={() => fetchUsers(currentPage, pageSize, searchTerm)} />
      ) : !users || users.length === 0 ? (
        <EmptyState
          title={searchTerm ? "No Search Results" : "No Users Registered"}
          description={
            searchTerm 
              ? `No user profiles matched your search for "${searchTerm}".` 
              : "It looks like there are no user profiles available in the system yet."
          }
          icon={<GroupIcon />}
          actionText={searchTerm ? "Clear Search" : "Add User"}
          onAction={searchTerm ? handleClearSearch : () => setIsCreateDialogOpen(true)}
        />
      ) : (
        <div className={styles.tableWrapper}>
          <UserTable users={users} onViewDetails={handleViewDetails} />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalElements}
            rowsPerPage={pageSize}
            page={currentPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            className="text-white border-t border-white/5"
            sx={{
              '.MuiTablePagination-selectIcon': {
                color: 'white',
              },
              '.MuiTablePagination-actions': {
                color: 'white',
              }
            }}
          />
        </div>
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
