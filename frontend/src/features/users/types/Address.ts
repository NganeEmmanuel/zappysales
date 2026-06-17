/**
 * Represents address details, matching backend AddressResponse exactly.
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
 * Request payload for creating a new address.
 */
export interface CreateAddressRequest {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

/**
 * Request payload for updating an existing address.
 */
export interface UpdateAddressRequest {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}
