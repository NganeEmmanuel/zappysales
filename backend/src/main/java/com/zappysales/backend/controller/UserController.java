package com.zappysales.backend.controller;

import com.zappysales.backend.dto.request.CreateAddressRequest;
import com.zappysales.backend.dto.request.CreateUserRequest;
import com.zappysales.backend.dto.request.UpdateAddressRequest;
import com.zappysales.backend.dto.request.UpdateUserRequest;
import com.zappysales.backend.dto.response.UserPageResponse;
import com.zappysales.backend.dto.response.UserResponse;
import com.zappysales.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * REST controller for managing {@link com.zappysales.backend.model.User} resources and their addresses.
 */
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    /**
     * Constructs a UserController with required dependencies.
     * Uses constructor injection only.
     *
     * @param userService the user service for processing business operations
     */
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Retrieves users registered in the system with pagination and search.
     *
     * @param page   the 0-based page index (default 0)
     * @param size   the page size limit (default 10)
     * @param search the search query filter (default "")
     * @return a page response containing matching users
     */
    @GetMapping
    public ResponseEntity<UserPageResponse> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search) {
        UserPageResponse usersPage = userService.findUsers(page, size, search);
        return ResponseEntity.ok(usersPage);
    }

    /**
     * Retrieves details for a specific user.
     *
     * @param userId the unique identifier of the user
     * @return the user details
     */
    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable UUID userId) {
        UserResponse user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    /**
     * Creates a new user profile.
     *
     * @param request the DTO payload containing new user details
     * @return the created user details
     */
    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody CreateUserRequest request) {
        UserResponse createdUser = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    /**
     * Updates an existing user's basic profile details.
     *
     * @param userId  the unique identifier of the user
     * @param request the DTO payload containing updated profile details
     * @return the updated user details
     */
    @PutMapping("/{userId}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable UUID userId, @Valid @RequestBody UpdateUserRequest request) {
        UserResponse updatedUser = userService.updateUser(userId, request);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * Adds an address to an existing user's profile.
     *
     * @param userId  the unique identifier of the user
     * @param request the DTO payload containing new address details
     * @return the updated user profile containing the new address
     */
    @PostMapping("/{userId}/addresses")
    public ResponseEntity<UserResponse> addAddress(
            @PathVariable UUID userId, @Valid @RequestBody CreateAddressRequest request) {
        UserResponse updatedUser = userService.addAddress(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedUser);
    }

    /**
     * Updates an address on a user's profile.
     *
     * @param userId    the unique identifier of the user
     * @param addressId the unique identifier of the address to update
     * @param request   the DTO payload containing updated address details
     * @return the updated user profile
     */
    @PutMapping("/{userId}/addresses/{addressId}")
    public ResponseEntity<UserResponse> updateAddress(
            @PathVariable UUID userId,
            @PathVariable UUID addressId,
            @Valid @RequestBody UpdateAddressRequest request) {
        UserResponse updatedUser = userService.updateAddress(userId, addressId, request);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * Removes an address from a user's profile.
     *
     * @param userId    the unique identifier of the user
     * @param addressId the unique identifier of the address to remove
     * @return the updated user profile
     */
    @DeleteMapping("/{userId}/addresses/{addressId}")
    public ResponseEntity<UserResponse> removeAddress(
            @PathVariable UUID userId,
            @PathVariable UUID addressId) {
        UserResponse updatedUser = userService.removeAddress(userId, addressId);
        return ResponseEntity.ok(updatedUser);
    }
}
