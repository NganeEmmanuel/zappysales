import { create } from 'zustand';
import type { 
  User, 
  CreateUserRequest, 
  UpdateUserRequest, 
  CreateAddressRequest, 
  UpdateAddressRequest 
} from '../types';
import userService from '../services/userService';
import type { ApiError } from '../../../api/client';

/**
 * Interface defining the users state and actions inside the userStore.
 */
interface UserState {
  // Pagination States
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  searchTerm: string;
  totalPages: number;
  totalElements: number;

  // Sync actions
  setUsers: (users: User[]) => void;
  setSelectedUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearStore: () => void;
  clearSelectedUser: () => void;

  // Async actions
  fetchUsers: (page?: number, size?: number, search?: string) => Promise<void>;
  fetchUserById: (userId: string) => Promise<void>;
  createUser: (request: CreateUserRequest) => Promise<void>;
  updateUser: (userId: string, request: UpdateUserRequest) => Promise<void>;
  addAddress: (userId: string, request: CreateAddressRequest) => Promise<void>;
  updateAddress: (userId: string, addressId: string, request: UpdateAddressRequest) => Promise<void>;
  deleteAddress: (userId: string, addressId: string) => Promise<void>;
}

/**
 * Zustand hook store for managing users feature states in the application.
 */
export const useUserStore = create<UserState>((set, get) => ({
  // Initial States
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  currentPage: 0,
  pageSize: 10,
  searchTerm: '',
  totalPages: 0,
  totalElements: 0,

  // Sync Actions
  setUsers: (users) => set({ users }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearStore: () => set({ 
    users: [], 
    selectedUser: null, 
    loading: false, 
    error: null,
    currentPage: 0,
    pageSize: 10,
    searchTerm: '',
    totalPages: 0,
    totalElements: 0
  }),
  clearSelectedUser: () => set({ selectedUser: null }),

  // Async Actions
  fetchUsers: async (page, size, search) => {
    const p = page !== undefined ? page : get().currentPage;
    const s = size !== undefined ? size : get().pageSize;
    const q = search !== undefined ? search : get().searchTerm;

    set({ loading: true, error: null });
    try {
      const response = await userService.getUsers(p, s, q);
      set({ 
        users: response.content, 
        currentPage: response.page,
        pageSize: response.size,
        searchTerm: q,
        totalElements: response.totalElements,
        totalPages: response.totalPages,
        loading: false 
      });
    } catch (err) {
      const apiErr = err as ApiError;
      set({ error: apiErr.message || 'Failed to fetch users', loading: false });
    }
  },

  fetchUserById: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const data = await userService.getUserById(userId);
      set({ selectedUser: data, loading: false });
    } catch (err) {
      const apiErr = err as ApiError;
      set({ error: apiErr.message || `Failed to fetch user with ID: ${userId}`, loading: false });
    }
  },

  createUser: async (request: CreateUserRequest) => {
    set({ loading: true, error: null });
    try {
      const newUser = await userService.createUser(request);
      set((state) => ({
        users: [...state.users, newUser],
        loading: false
      }));
    } catch (err) {
      const apiErr = err as ApiError;
      set({ error: apiErr.message || 'Failed to create user', loading: false });
      throw err;
    }
  },

  updateUser: async (userId: string, request: UpdateUserRequest) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await userService.updateUser(userId, request);
      set((state) => ({
        selectedUser: state.selectedUser?.id === userId ? updatedUser : state.selectedUser,
        users: state.users.map((u) => (u.id === userId ? updatedUser : u)),
        loading: false
      }));
    } catch (err) {
      const apiErr = err as ApiError;
      set({ error: apiErr.message || 'Failed to update user', loading: false });
      throw err;
    }
  },

  addAddress: async (userId: string, request: CreateAddressRequest) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await userService.addAddress(userId, request);
      set((state) => ({
        selectedUser: state.selectedUser?.id === userId ? updatedUser : state.selectedUser,
        users: state.users.map((u) => (u.id === userId ? updatedUser : u)),
        loading: false
      }));
    } catch (err) {
      const apiErr = err as ApiError;
      set({ error: apiErr.message || 'Failed to add address', loading: false });
      throw err;
    }
  },

  updateAddress: async (userId: string, addressId: string, request: UpdateAddressRequest) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await userService.updateAddress(userId, addressId, request);
      set((state) => ({
        selectedUser: state.selectedUser?.id === userId ? updatedUser : state.selectedUser,
        users: state.users.map((u) => (u.id === userId ? updatedUser : u)),
        loading: false
      }));
    } catch (err) {
      const apiErr = err as ApiError;
      set({ error: apiErr.message || 'Failed to update address', loading: false });
      throw err;
    }
  },

  deleteAddress: async (userId: string, addressId: string) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await userService.deleteAddress(userId, addressId);
      set((state) => ({
        selectedUser: state.selectedUser?.id === userId ? updatedUser : state.selectedUser,
        users: state.users.map((u) => (u.id === userId ? updatedUser : u)),
        loading: false
      }));
    } catch (err) {
      const apiErr = err as ApiError;
      set({ error: apiErr.message || 'Failed to delete address', loading: false });
      throw err;
    }
  }
}));

export default useUserStore;
