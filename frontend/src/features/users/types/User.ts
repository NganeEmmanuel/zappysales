import type { Address, CreateAddressRequest } from './Address';

/**
 * Represents a User entity, matching backend UserResponse exactly.
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  addresses: Address[];
}

/**
 * Request payload for creating a new user.
 */
export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  addresses?: CreateAddressRequest[];
}

/**
 * Request payload for updating an existing user.
 */
export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
}
