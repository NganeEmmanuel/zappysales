import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useUserStore } from './userStore';
import userService from '../services/userService';
import type { User, PageResponse } from '../types';

vi.mock('../services/userService');

const mockUser: User = {
  id: 'user-1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  addresses: [],
};

const mockPageResponse: PageResponse<User> = {
  content: [mockUser],
  page: 0,
  size: 10,
  totalElements: 1,
  totalPages: 1,
  hasNext: false,
  hasPrevious: false,
};

describe('userStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useUserStore.getState().clearStore();
  });

  it('should initialize with correct default state', () => {
    const state = useUserStore.getState();
    expect(state.users).toEqual([]);
    expect(state.selectedUser).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.currentPage).toBe(0);
    expect(state.pageSize).toBe(10);
    expect(state.searchTerm).toBe('');
    expect(state.totalPages).toBe(0);
    expect(state.totalElements).toBe(0);
  });

  describe('fetchUsers', () => {
    it('should successfully fetch users, populate store, and set loading states', async () => {
      // Arrange
      vi.mocked(userService.getUsers).mockResolvedValue(mockPageResponse);

      // Act
      const promise = useUserStore.getState().fetchUsers(0, 10, 'John');
      
      // Assert loading state
      expect(useUserStore.getState().loading).toBe(true);
      expect(useUserStore.getState().error).toBeNull();

      await promise;

      expect(useUserStore.getState().loading).toBe(false);
      expect(useUserStore.getState().users).toEqual([mockUser]);
      expect(useUserStore.getState().totalElements).toBe(1);
      expect(useUserStore.getState().totalPages).toBe(1);
      expect(useUserStore.getState().searchTerm).toBe('John');
      expect(userService.getUsers).toHaveBeenCalledWith(0, 10, 'John');
    });

    it('should set error state on API failure', async () => {
      // Arrange
      vi.mocked(userService.getUsers).mockRejectedValue({ message: 'API Error' });

      // Act
      await useUserStore.getState().fetchUsers(0, 10, '');

      // Assert
      expect(useUserStore.getState().loading).toBe(false);
      expect(useUserStore.getState().error).toBe('API Error');
      expect(useUserStore.getState().users).toEqual([]);
    });
  });

  describe('fetchUserById', () => {
    it('should successfully fetch single user and set selectedUser', async () => {
      // Arrange
      vi.mocked(userService.getUserById).mockResolvedValue(mockUser);

      // Act
      const promise = useUserStore.getState().fetchUserById('user-1');
      expect(useUserStore.getState().loading).toBe(true);

      await promise;

      // Assert
      expect(useUserStore.getState().loading).toBe(false);
      expect(useUserStore.getState().selectedUser).toEqual(mockUser);
      expect(userService.getUserById).toHaveBeenCalledWith('user-1');
    });

    it('should set error on failure to fetch user', async () => {
      // Arrange
      vi.mocked(userService.getUserById).mockRejectedValue({ message: 'User not found' });

      // Act
      await useUserStore.getState().fetchUserById('user-99');

      // Assert
      expect(useUserStore.getState().loading).toBe(false);
      expect(useUserStore.getState().error).toBe('User not found');
      expect(useUserStore.getState().selectedUser).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should invoke userService.createUser and add it to user list', async () => {
      // Arrange
      const requestPayload = { firstName: 'Alice', lastName: 'Wonder', email: 'alice@example.com' };
      const newUser: User = { id: 'user-2', ...requestPayload, addresses: [] };
      vi.mocked(userService.createUser).mockResolvedValue(newUser);

      // Act
      await useUserStore.getState().createUser(requestPayload);

      // Assert
      expect(useUserStore.getState().users).toContainEqual(newUser);
      expect(userService.createUser).toHaveBeenCalledWith(requestPayload);
    });
  });

  describe('updateUser', () => {
    it('should invoke userService.updateUser and refresh modified user in store', async () => {
      // Arrange
      const updatedUser: User = { ...mockUser, firstName: 'Johnny' };
      vi.mocked(userService.updateUser).mockResolvedValue(updatedUser);
      
      useUserStore.setState({ users: [mockUser], selectedUser: mockUser });

      // Act
      await useUserStore.getState().updateUser('user-1', { firstName: 'Johnny', lastName: 'Doe' });

      // Assert
      expect(useUserStore.getState().selectedUser?.firstName).toBe('Johnny');
      expect(useUserStore.getState().users[0].firstName).toBe('Johnny');
      expect(userService.updateUser).toHaveBeenCalledWith('user-1', { firstName: 'Johnny', lastName: 'Doe' });
    });
  });

  describe('addAddress', () => {
    it('should invoke userService.addAddress and update user addresses in state', async () => {
      // Arrange
      const newAddress = { street: '1 Elm St', city: 'Denver', state: 'CO', country: 'USA', postalCode: '80201' };
      const updatedUser: User = { ...mockUser, addresses: [{ id: 'addr-1', ...newAddress }] };
      vi.mocked(userService.addAddress).mockResolvedValue(updatedUser);
      
      useUserStore.setState({ users: [mockUser], selectedUser: mockUser });

      // Act
      await useUserStore.getState().addAddress('user-1', newAddress);

      // Assert
      expect(useUserStore.getState().selectedUser?.addresses).toHaveLength(1);
      expect(useUserStore.getState().users[0].addresses).toHaveLength(1);
      expect(userService.addAddress).toHaveBeenCalledWith('user-1', newAddress);
    });
  });

  describe('updateAddress', () => {
    it('should invoke userService.updateAddress and replace that address inside store user data', async () => {
      // Arrange
      const originalUser = { ...mockUser, addresses: [{ id: 'addr-1', street: 'Old St', city: 'Denver', state: 'CO', country: 'USA', postalCode: '80201' }] };
      const updatedAddress = { street: 'New St', city: 'Denver', state: 'CO', country: 'USA', postalCode: '80201' };
      const updatedUser: User = { ...mockUser, addresses: [{ id: 'addr-1', ...updatedAddress }] };
      
      vi.mocked(userService.updateAddress).mockResolvedValue(updatedUser);
      useUserStore.setState({ users: [originalUser], selectedUser: originalUser });

      // Act
      await useUserStore.getState().updateAddress('user-1', 'addr-1', updatedAddress);

      // Assert
      expect(useUserStore.getState().selectedUser?.addresses?.[0].street).toBe('New St');
      expect(useUserStore.getState().users[0].addresses?.[0].street).toBe('New St');
      expect(userService.updateAddress).toHaveBeenCalledWith('user-1', 'addr-1', updatedAddress);
    });
  });

  describe('deleteAddress', () => {
    it('should invoke userService.deleteAddress and remove address from user data inside store', async () => {
      // Arrange
      const originalUser = { ...mockUser, addresses: [{ id: 'addr-1', street: 'Old St', city: 'Denver', state: 'CO', country: 'USA', postalCode: '80201' }] };
      const updatedUser: User = { ...mockUser, addresses: [] };
      
      vi.mocked(userService.deleteAddress).mockResolvedValue(updatedUser);
      useUserStore.setState({ users: [originalUser], selectedUser: originalUser });

      // Act
      await useUserStore.getState().deleteAddress('user-1', 'addr-1');

      // Assert
      expect(useUserStore.getState().selectedUser?.addresses).toHaveLength(0);
      expect(useUserStore.getState().users[0].addresses).toHaveLength(0);
      expect(userService.deleteAddress).toHaveBeenCalledWith('user-1', 'addr-1');
    });
  });
});
