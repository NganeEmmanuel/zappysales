package com.zappysales.backend.repository;

import com.zappysales.backend.model.User;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository interface for managing {@link User} data.
 */
public interface UserRepository {

    /**
     * Finds a user by their unique identifier.
     *
     * @param id the unique identifier of the user
     * @return an Optional containing the found User, or empty if not found
     */
    Optional<User> findById(UUID id);

    /**
     * Finds a user by their email address.
     *
     * @param email the email address of the user
     * @return an Optional containing the found User, or empty if not found
     */
    Optional<User> findByEmail(String email);

    /**
     * Retrieves all users.
     *
     * @return a list of all users
     */
    List<User> findAll();

    /**
     * Saves a user. If the user already exists, updates it; otherwise, creates a new one.
     *
     * @param user the user to save
     * @return the saved user
     */
    User save(User user);

    /**
     * Deletes a user by their unique identifier.
     *
     * @param id the unique identifier of the user to delete
     */
    void deleteById(UUID id);
}
