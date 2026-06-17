/**
 * Represents address details of a User.
 */
export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

/**
 * Represents a User entity with its collection of Address profiles.
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  addresses: Address[];
}
