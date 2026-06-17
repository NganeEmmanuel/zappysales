package com.zappysales.backend.controller;

import com.zappysales.backend.dto.request.CreateAddressRequest;
import com.zappysales.backend.dto.request.CreateUserRequest;
import com.zappysales.backend.dto.request.UpdateAddressRequest;
import com.zappysales.backend.dto.request.UpdateUserRequest;
import com.zappysales.backend.dto.response.UserPageResponse;
import com.zappysales.backend.dto.response.UserResponse;
import com.zappysales.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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

import java.util.UUID;

/**
 * REST controller for managing {@link com.zappysales.backend.model.User} resources and their addresses.
 */
@Tag(name = "User Management", description = "Endpoints for managing user registration profiles and associated shipping/billing addresses.")
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
    @Operation(
            summary = "Get paginated users",
            description = "Retrieves a paginated and filtered list of user profiles matching the search criteria (checks email, first name, and last name)."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "200",
                description = "Successfully retrieved users",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserPageResponse.class))
        ),
        @ApiResponse(
                responseCode = "400",
                description = "Invalid pagination or search parameters",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.zappysales.backend.dto.response.ApiErrorResponse.class))
        )
    })
    @GetMapping
    public ResponseEntity<UserPageResponse> getUsers(
            @Parameter(description = "The 0-based page index to retrieve", example = "0")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "The number of records per page", example = "10")
            @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Search query to filter users by name or email (case-insensitive substring)", example = "Emmanuel")
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
    @Operation(
            summary = "Get user by ID",
            description = "Retrieves details of a single user profile and all their registered addresses using their unique UUID."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "200",
                description = "Successfully retrieved user profile",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponse.class))
        ),
        @ApiResponse(
                responseCode = "404",
                description = "User profile not found",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.zappysales.backend.dto.response.ApiErrorResponse.class))
        )
    })
    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserById(
            @Parameter(description = "The unique UUID identifier of the user", required = true, example = "11111111-1111-1111-1111-111111111111")
            @PathVariable UUID userId) {
        UserResponse user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    /**
     * Creates a new user profile.
     *
     * @param request the DTO payload containing new user details
     * @return the created user details
     */
    @Operation(
            summary = "Create a new user profile",
            description = "Registers a new user profile under a unique email address, optionally including initial addresses."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "201",
                description = "User profile created successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponse.class))
        ),
        @ApiResponse(
                responseCode = "400",
                description = "Invalid input validation data or email address is already in use",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.zappysales.backend.dto.response.ApiErrorResponse.class))
        )
    })
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
    @Operation(
            summary = "Update user profile info",
            description = "Modifies the first name and last name fields of an existing user profile."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "200",
                description = "User profile updated successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponse.class))
        ),
        @ApiResponse(
                responseCode = "400",
                description = "Invalid validation constraints in profile update fields",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.zappysales.backend.dto.response.ApiErrorResponse.class))
        ),
        @ApiResponse(
                responseCode = "404",
                description = "User profile not found with the specified UUID",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.zappysales.backend.dto.response.ApiErrorResponse.class))
        )
    })
    @PutMapping("/{userId}")
    public ResponseEntity<UserResponse> updateUser(
            @Parameter(description = "The unique UUID identifier of the user to update", required = true, example = "11111111-1111-1111-1111-111111111111")
            @PathVariable UUID userId,
            @Valid @RequestBody UpdateUserRequest request) {
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
    @Operation(
            summary = "Add address to user profile",
            description = "Creates and appends a new shipping or billing address to a user profile (1-to-many relationship)."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "201",
                description = "Address added successfully and returns the updated user profile",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponse.class))
        ),
        @ApiResponse(
                responseCode = "400",
                description = "Invalid address validation check",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.zappysales.backend.dto.response.ApiErrorResponse.class))
        ),
        @ApiResponse(
                responseCode = "404",
                description = "User profile not found with the specified UUID",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.zappysales.backend.dto.response.ApiErrorResponse.class))
        )
    })
    @PostMapping("/{userId}/addresses")
    public ResponseEntity<UserResponse> addAddress(
            @Parameter(description = "The unique UUID identifier of the user", required = true, example = "11111111-1111-1111-1111-111111111111")
            @PathVariable UUID userId,
            @Valid @RequestBody CreateAddressRequest request) {
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
    @Operation(
            summary = "Update user address details",
            description = "Modifies the detailed fields (street, city, state, country, postal code) of an existing address linked to a user profile."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "200",
                description = "Address updated successfully and returns the updated user profile",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponse.class))
        ),
        @ApiResponse(
                responseCode = "400",
                description = "Invalid address fields input",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.zappysales.backend.dto.response.ApiErrorResponse.class))
        ),
        @ApiResponse(
                responseCode = "404",
                description = "User profile or address not found",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.zappysales.backend.dto.response.ApiErrorResponse.class))
        )
    })
    @PutMapping("/{userId}/addresses/{addressId}")
    public ResponseEntity<UserResponse> updateAddress(
            @Parameter(description = "The unique UUID identifier of the user", required = true, example = "11111111-1111-1111-1111-111111111111")
            @PathVariable UUID userId,
            @Parameter(description = "The unique UUID identifier of the address to update", required = true, example = "11111111-1111-1111-1111-222222222222")
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
    @Operation(
            summary = "Delete user address",
            description = "Deletes a specific address linked to a user profile using their UUID identifiers."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "200",
                description = "Address removed successfully and returns the updated user profile",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponse.class))
        ),
        @ApiResponse(
                responseCode = "404",
                description = "User profile or address not found with specified UUIDs",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.zappysales.backend.dto.response.ApiErrorResponse.class))
        )
    })
    @DeleteMapping("/{userId}/addresses/{addressId}")
    public ResponseEntity<UserResponse> removeAddress(
            @Parameter(description = "The unique UUID identifier of the user", required = true, example = "11111111-1111-1111-1111-111111111111")
            @PathVariable UUID userId,
            @Parameter(description = "The unique UUID identifier of the address to remove", required = true, example = "11111111-1111-1111-1111-222222222222")
            @PathVariable UUID addressId) {
        UserResponse updatedUser = userService.removeAddress(userId, addressId);
        return ResponseEntity.ok(updatedUser);
    }
}
