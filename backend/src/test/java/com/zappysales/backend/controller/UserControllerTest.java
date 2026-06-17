package com.zappysales.backend.controller;

import tools.jackson.databind.ObjectMapper;
import com.zappysales.backend.dto.request.CreateAddressRequest;
import com.zappysales.backend.dto.request.CreateUserRequest;
import com.zappysales.backend.dto.request.UpdateAddressRequest;
import com.zappysales.backend.dto.request.UpdateUserRequest;
import com.zappysales.backend.dto.response.AddressResponse;
import com.zappysales.backend.dto.response.UserResponse;
import com.zappysales.backend.exception.ResourceNotFoundException;
import com.zappysales.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Controller slice tests for {@link UserController}.
 */
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserService userService;

    @Test
    void getAllUsers_Success() throws Exception {
        // Arrange
        UserResponse userResponse = new UserResponse(
                UUID.randomUUID(), "john@example.com", "John", "Doe", Collections.emptyList()
        );
        when(userService.getAllUsers()).thenReturn(List.of(userResponse));

        // Act & Assert
        mockMvc.perform(get("/api/v1/users"))
                .andExpect(status().isOk())
                .andExpect(header().string("X-Content-Type-Options", "nosniff"))
                .andExpect(header().string("X-Frame-Options", "DENY"))
                .andExpect(header().string("Referrer-Policy", "no-referrer"))
                .andExpect(jsonPath("$[0].email").value("john@example.com"))
                .andExpect(jsonPath("$[0].firstName").value("John"));
    }

    @Test
    void getUserById_Success() throws Exception {
        // Arrange
        UUID userId = UUID.randomUUID();
        UserResponse userResponse = new UserResponse(
                userId, "john@example.com", "John", "Doe", Collections.emptyList()
        );
        when(userService.getUserById(userId)).thenReturn(userResponse);

        // Act & Assert
        mockMvc.perform(get("/api/v1/users/{userId}", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(userId.toString()))
                .andExpect(jsonPath("$.email").value("john@example.com"));
    }

    @Test
    void getUserById_NotFound_Returns404() throws Exception {
        // Arrange
        UUID userId = UUID.randomUUID();
        when(userService.getUserById(userId)).thenThrow(new ResourceNotFoundException("User not found with ID: " + userId));

        // Act & Assert
        mockMvc.perform(get("/api/v1/users/{userId}", userId))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.error").value("Not Found"))
                .andExpect(jsonPath("$.message").value("User not found with ID: " + userId))
                .andExpect(jsonPath("$.path").value("/api/v1/users/" + userId));
    }

    @Test
    void createUser_Success_Returns201() throws Exception {
        // Arrange
        CreateUserRequest request = new CreateUserRequest("john@example.com", "John", "Doe", new ArrayList<>());
        UserResponse response = new UserResponse(UUID.randomUUID(), "john@example.com", "John", "Doe", new ArrayList<>());
        when(userService.createUser(any(CreateUserRequest.class))).thenReturn(response);

        // Act & Assert
        mockMvc.perform(post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value("john@example.com"))
                .andExpect(jsonPath("$.firstName").value("John"));
    }

    @Test
    void createUser_ValidationFailure_Returns400() throws Exception {
        // Arrange: Missing email and invalid format
        CreateUserRequest request = new CreateUserRequest("invalid-email", "", "Doe", new ArrayList<>());

        // Act & Assert
        mockMvc.perform(post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.error").value("Bad Request"))
                .andExpect(jsonPath("$.message").value(org.hamcrest.Matchers.containsString("Validation failed")));
    }

    @Test
    void updateUser_Success_Returns200() throws Exception {
        // Arrange
        UUID userId = UUID.randomUUID();
        UpdateUserRequest request = new UpdateUserRequest("Johnny", "Doe");
        UserResponse response = new UserResponse(userId, "john@example.com", "Johnny", "Doe", new ArrayList<>());
        when(userService.updateUser(eq(userId), any(UpdateUserRequest.class))).thenReturn(response);

        // Act & Assert
        mockMvc.perform(put("/api/v1/users/{userId}", userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("Johnny"));
    }

    @Test
    void addAddress_Success_Returns201() throws Exception {
        // Arrange
        UUID userId = UUID.randomUUID();
        CreateAddressRequest request = new CreateAddressRequest("123 Main St", "Springfield", "IL", "US", "62701");
        AddressResponse addressResponse = new AddressResponse(UUID.randomUUID(), "123 Main St", "Springfield", "IL", "US", "62701");
        UserResponse userResponse = new UserResponse(userId, "john@example.com", "John", "Doe", List.of(addressResponse));
        when(userService.addAddress(eq(userId), any(CreateAddressRequest.class))).thenReturn(userResponse);

        // Act & Assert
        mockMvc.perform(post("/api/v1/users/{userId}/addresses", userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.addresses[0].street").value("123 Main St"));
    }

    @Test
    void updateAddress_Success_Returns200() throws Exception {
        // Arrange
        UUID userId = UUID.randomUUID();
        UUID addressId = UUID.randomUUID();
        UpdateAddressRequest request = new UpdateAddressRequest("456 New Ave", "Springfield", "IL", "US", "62701");
        AddressResponse addressResponse = new AddressResponse(addressId, "456 New Ave", "Springfield", "IL", "US", "62701");
        UserResponse userResponse = new UserResponse(userId, "john@example.com", "John", "Doe", List.of(addressResponse));
        when(userService.updateAddress(eq(userId), eq(addressId), any(UpdateAddressRequest.class))).thenReturn(userResponse);

        // Act & Assert
        mockMvc.perform(put("/api/v1/users/{userId}/addresses/{addressId}", userId, addressId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.addresses[0].street").value("456 New Ave"));
    }

    @Test
    void removeAddress_Success_Returns200() throws Exception {
        // Arrange
        UUID userId = UUID.randomUUID();
        UUID addressId = UUID.randomUUID();
        UserResponse userResponse = new UserResponse(userId, "john@example.com", "John", "Doe", new ArrayList<>());
        when(userService.removeAddress(userId, addressId)).thenReturn(userResponse);

        // Act & Assert
        mockMvc.perform(delete("/api/v1/users/{userId}/addresses/{addressId}", userId, addressId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.addresses").isEmpty());
    }
}
