import apiClient from '../../../api/client';
import type { 
  User, 
  CreateUserRequest, 
  UpdateUserRequest, 
  CreateAddressRequest, 
  UpdateAddressRequest,
  PageResponse
} from '../types';

/**
 * Service providing API calls for managing users and addresses.
 * Integrates with the centralized Axios apiClient.
 */
export const userService = {
  /**
   * Retrieves a paginated and filtered page of users.
   */
  getUsers: async (page: number, size: number, search: string): Promise<PageResponse<User>> => {
    return apiClient.get<unknown, PageResponse<User>>('/users', {
      params: { page, size, search }
    });
  },

  /**
   * Retrieves detail for a specific user.
   */
  getUserById: async (userId: string): Promise<User> => {
    return apiClient.get<unknown, User>(`/users/${userId}`);
  },

  /**
   * Creates a new user profile.
   */
  createUser: async (request: CreateUserRequest): Promise<User> => {
    return apiClient.post<unknown, User>('/users', request);
  },

  /**
   * Updates basic user details.
   */
  updateUser: async (userId: string, request: UpdateUserRequest): Promise<User> => {
    return apiClient.put<unknown, User>(`/users/${userId}`, request);
  },

  /**
   * Adds an address to a user's profile.
   * Returns the updated User response.
   */
  addAddress: async (userId: string, request: CreateAddressRequest): Promise<User> => {
    return apiClient.post<unknown, User>(`/users/${userId}/addresses`, request);
  },

  /**
   * Updates an address on a user's profile.
   * Returns the updated User response.
   */
  updateAddress: async (
    userId: string, 
    addressId: string, 
    request: UpdateAddressRequest
  ): Promise<User> => {
    return apiClient.put<unknown, User>(`/users/${userId}/addresses/${addressId}`, request);
  },

  /**
   * Removes an address from a user's profile.
   * Returns the updated User response.
   */
  deleteAddress: async (userId: string, addressId: string): Promise<User> => {
    return apiClient.delete<unknown, User>(`/users/${userId}/addresses/${addressId}`);
  }
};

export default userService;
