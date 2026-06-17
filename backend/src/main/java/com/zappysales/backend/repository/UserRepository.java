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
     * Finds users matching a search query using pagination.
     *
     * @param page   the 0-based page index
     * @param size   the page size limit
     * @param search the case-insensitive search text
     * @return a list slice of matching users
     */
    List<User> findUsers(int page, int size, String search);

    /**
     * Counts the total number of users matching a search query.
     *
     * @param search the case-insensitive search text
     * @return the total matching elements count
     */
    long countUsers(String search);

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
