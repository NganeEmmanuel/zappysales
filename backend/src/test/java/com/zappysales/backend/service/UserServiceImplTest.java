package com.zappysales.backend.service;

import com.zappysales.backend.dto.request.CreateAddressRequest;
import com.zappysales.backend.dto.request.CreateUserRequest;
import com.zappysales.backend.dto.request.UpdateAddressRequest;
import com.zappysales.backend.dto.request.UpdateUserRequest;
import com.zappysales.backend.dto.response.UserPageResponse;
import com.zappysales.backend.dto.response.UserResponse;
import com.zappysales.backend.exception.EmailAlreadyExistsException;
import com.zappysales.backend.exception.ResourceNotFoundException;
import com.zappysales.backend.mapper.UserMapper;
import com.zappysales.backend.model.Address;
import com.zappysales.backend.model.User;
import com.zappysales.backend.repository.UserRepository;
import com.zappysales.backend.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Unit tests for {@link UserServiceImpl}.
 */
@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    private UserMapper userMapper;

    private UserService userService;

    @BeforeEach
    void setUp() {
        userMapper = new UserMapper(); // Using real mapper since it has simple pure logic
        userService = new UserServiceImpl(userRepository, userMapper);
    }

    @Test
    void createUser_Success() {
        // Arrange
        CreateUserRequest request = new CreateUserRequest(
                "test@example.com", "John", "Doe", Collections.emptyList()
        );
        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        UserResponse response = userService.createUser(request);

        // Assert
        assertNotNull(response);
        assertNotNull(response.getId());
        assertEquals("test@example.com", response.getEmail());
        assertEquals("John", response.getFirstName());
        assertEquals("Doe", response.getLastName());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void createUser_ThrowsEmailAlreadyExists() {
        // Arrange
        CreateUserRequest request = new CreateUserRequest(
                "existing@example.com", "John", "Doe", Collections.emptyList()
        );
        User existingUser = new User(UUID.randomUUID(), "existing@example.com", "Jane", "Smith", new ArrayList<>());
        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(existingUser));

        // Act & Assert
        assertThrows(EmailAlreadyExistsException.class, () -> userService.createUser(request));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void getUserById_Success() {
        // Arrange
        UUID userId = UUID.randomUUID();
        User user = new User(userId, "test@example.com", "John", "Doe", new ArrayList<>());
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        // Act
        UserResponse response = userService.getUserById(userId);

        // Assert
        assertNotNull(response);
        assertEquals(userId, response.getId());
        assertEquals("test@example.com", response.getEmail());
    }

    @Test
    void getUserById_ThrowsResourceNotFoundException() {
        // Arrange
        UUID userId = UUID.randomUUID();
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> userService.getUserById(userId));
    }

    @Test
    void updateUser_Success() {
        // Arrange
        UUID userId = UUID.randomUUID();
        User user = new User(userId, "test@example.com", "John", "Doe", new ArrayList<>());
        UpdateUserRequest updateRequest = new UpdateUserRequest("Johnny", "D");
        
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        UserResponse response = userService.updateUser(userId, updateRequest);

        // Assert
        assertNotNull(response);
        assertEquals("Johnny", response.getFirstName());
        assertEquals("D", response.getLastName());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void addAddress_Success() {
        // Arrange
        UUID userId = UUID.randomUUID();
        User user = new User(userId, "test@example.com", "John", "Doe", new ArrayList<>());
        CreateAddressRequest addressRequest = new CreateAddressRequest("123 Street", "City", "State", "Country", "12345");
        
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        UserResponse response = userService.addAddress(userId, addressRequest);

        // Assert
        assertNotNull(response);
        assertEquals(1, response.getAddresses().size());
        assertEquals("123 Street", response.getAddresses().get(0).getStreet());
        assertNotNull(response.getAddresses().get(0).getId());
    }

    @Test
    void updateAddress_Success() {
        // Arrange
        UUID userId = UUID.randomUUID();
        UUID addressId = UUID.randomUUID();
        Address address = new Address(addressId, "Old Street", "City", "State", "Country", "12345");
        ArrayList<Address> addresses = new ArrayList<>();
        addresses.add(address);
        
        User user = new User(userId, "test@example.com", "John", "Doe", addresses);
        UpdateAddressRequest updateRequest = new UpdateAddressRequest("New Street", "City", "State", "Country", "12345");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        UserResponse response = userService.updateAddress(userId, addressId, updateRequest);

        // Assert
        assertNotNull(response);
        assertEquals(1, response.getAddresses().size());
        assertEquals("New Street", response.getAddresses().get(0).getStreet());
    }

    @Test
    void removeAddress_Success() {
        // Arrange
        UUID userId = UUID.randomUUID();
        UUID addressId = UUID.randomUUID();
        Address address = new Address(addressId, "Street", "City", "State", "Country", "12345");
        ArrayList<Address> addresses = new ArrayList<>();
        addresses.add(address);
        
        User user = new User(userId, "test@example.com", "John", "Doe", addresses);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        UserResponse response = userService.removeAddress(userId, addressId);

        // Assert
        assertNotNull(response);
        assertTrue(response.getAddresses().isEmpty());
    }

    @Test
    void findUsers_Success() {
        // Arrange
        User user1 = new User(UUID.randomUUID(), "john@example.com", "John", "Doe", new ArrayList<>());
        User user2 = new User(UUID.randomUUID(), "jane@example.com", "Jane", "Smith", new ArrayList<>());
        
        when(userRepository.countUsers("")).thenReturn(2L);
        when(userRepository.findUsers(0, 10, "")).thenReturn(List.of(user1, user2));

        // Act
        UserPageResponse response = userService.findUsers(0, 10, "");

        // Assert
        assertNotNull(response);
        assertEquals(2, response.getContent().size());
        assertEquals(0, response.getPage());
        assertEquals(10, response.getSize());
        assertEquals(2L, response.getTotalElements());
        assertEquals(1, response.getTotalPages());
        assertFalse(response.isHasNext());
        assertFalse(response.isHasPrevious());
    }

    @Test
    void findUsers_InvalidArguments_ThrowsException() {
        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> userService.findUsers(-1, 10, ""));
        assertThrows(IllegalArgumentException.class, () -> userService.findUsers(0, 0, ""));
    }
}
