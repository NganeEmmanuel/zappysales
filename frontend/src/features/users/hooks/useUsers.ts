import { useUserStore } from '../store/userStore';

/**
 * Custom React hook for encapsulating and exposing user-related state and store actions.
 * Ensures page views and components communicate with services and state managers transparently.
 */
export const useUsers = () => {
  const users = useUserStore((state) => state.users);
  const selectedUser = useUserStore((state) => state.selectedUser);
  const loading = useUserStore((state) => state.loading);
  const error = useUserStore((state) => state.error);

  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const fetchUserById = useUserStore((state) => state.fetchUserById);
  const createUser = useUserStore((state) => state.createUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const clearSelectedUser = useUserStore((state) => state.clearSelectedUser);
  
  const addAddress = useUserStore((state) => state.addAddress);
  const updateAddress = useUserStore((state) => state.updateAddress);
  const deleteAddress = useUserStore((state) => state.deleteAddress);

  return {
    // States
    users,
    selectedUser,
    loading,
    error,

    // Actions
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    clearSelectedUser,
    addAddress,
    updateAddress,
    deleteAddress,
  };
};

export default useUsers;
