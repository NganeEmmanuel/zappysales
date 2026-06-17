import { create } from 'zustand';
import type { User } from '../types';

/**
 * Interface defining the users state and actions inside the userStore.
 */
interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  setUsers: (users: User[]) => void;
  setSelectedUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearStore: () => void;
}

/**
 * Zustand hook store for managing users feature states in the application.
 */
export const useUserStore = create<UserState>((set) => ({
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  setUsers: (users) => set({ users }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearStore: () => set({ users: [], selectedUser: null, loading: false, error: null }),
}));

export default useUserStore;
