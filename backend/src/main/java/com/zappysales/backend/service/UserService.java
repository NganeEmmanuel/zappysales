package com.zappysales.backend.service;

import com.zappysales.backend.dto.request.CreateAddressRequest;
import com.zappysales.backend.dto.request.CreateUserRequest;
import com.zappysales.backend.dto.request.UpdateAddressRequest;
import com.zappysales.backend.dto.request.UpdateUserRequest;
import com.zappysales.backend.dto.response.UserPageResponse;
import com.zappysales.backend.dto.response.UserResponse;
import com.zappysales.backend.exception.EmailAlreadyExistsException;
import com.zappysales.backend.exception.ResourceNotFoundException;

import java.util.List;
import java.util.UUID;

/**
 * Service interface defining business operations for {@link com.zappysales.backend.model.User} resources.
 */
public interface UserService {

    /**
     * Creates a new user in the system.
     *
     * @param request the DTO containing user creation data
     * @return the created user details
     * @throws EmailAlreadyExistsException if the email is already registered in the system
     * @throws IllegalArgumentException    if the request is null
     */
    UserResponse createUser(CreateUserRequest request);

    /**
     * Retrieves a user by their unique identifier.
     *
     * @param id the unique identifier of the user
     * @return the user details
     * @throws ResourceNotFoundException if no user is found with the given identifier
     * @throws IllegalArgumentException  if the id is null
     */
    UserResponse getUserById(UUID id);

    /**
     * Finds users matching a search query using pagination.
     *
     * @param page   the 0-based page index
     * @param size   the page size limit
     * @param search the case-insensitive search text
     * @return a paginated and filtered list of user details
     */
    UserPageResponse findUsers(int page, int size, String search);

    /**
     * Updates an existing user's profile information.
     *
     * @param id      the unique identifier of the user to update
     * @param request the DTO containing updated profile data
     * @return the updated user details
     * @throws ResourceNotFoundException if no user is found with the given identifier
     * @throws IllegalArgumentException  if the id or request is null
     */
    UserResponse updateUser(UUID id, UpdateUserRequest request);

    /**
     * Deletes a user from the system by their identifier.
     *
     * @param id the unique identifier of the user to delete
     * @throws ResourceNotFoundException if no user is found with the given identifier
     * @throws IllegalArgumentException  if the id is null
     */
    void deleteUser(UUID id);

    /**
     * Adds a new address to a user's address profile.
     *
     * @param userId  the unique identifier of the user
     * @param request the DTO containing the new address details
     * @return the updated user details containing the new address
     * @throws ResourceNotFoundException if no user is found with the given identifier
     * @throws IllegalArgumentException  if the userId or request is null
     */
    UserResponse addAddress(UUID userId, CreateAddressRequest request);

    /**
     * Updates an existing address for a user.
     *
     * @param userId    the unique identifier of the user
     * @param addressId the unique identifier of the address to update
     * @param request   the DTO containing the updated address details
     * @return the updated user details containing the modified address
     * @throws ResourceNotFoundException if no user or address is found with the given identifiers
     * @throws IllegalArgumentException  if any argument is null
     */
    UserResponse updateAddress(UUID userId, UUID addressId, UpdateAddressRequest request);

    /**
     * Removes an address from a user's profile.
     *
     * @param userId    the unique identifier of the user
     * @param addressId the unique identifier of the address to remove
     * @return the updated user details
     * @throws ResourceNotFoundException if no user or address is found with the given identifiers
     * @throws IllegalArgumentException  if any argument is null
     */
    UserResponse removeAddress(UUID userId, UUID addressId);
}
