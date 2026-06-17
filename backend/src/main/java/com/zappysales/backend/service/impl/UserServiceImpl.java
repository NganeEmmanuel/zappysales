package com.zappysales.backend.service.impl;

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
import com.zappysales.backend.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

/**
 * Service implementation for {@link UserService} managing user business operations.
 */
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    /**
     * Constructs a new UserServiceImpl with required dependencies.
     * Uses constructor injection only.
     *
     * @param userRepository the repository for user operations
     * @param userMapper     the mapper for converting between models and DTOs
     */
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserResponse createUser(CreateUserRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("User creation request cannot be null");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("A user with email '" + request.getEmail() + "' already exists");
        }

        User user = userMapper.toUser(request);
        User savedUser = userRepository.save(user);
        return userMapper.toUserResponse(savedUser);
    }

    @Override
    public UserResponse getUserById(UUID id) {
        if (id == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        return userMapper.toUserResponse(user);
    }

    @Override
    public UserPageResponse findUsers(int page, int size, String search) {
        if (page < 0) {
            throw new IllegalArgumentException("Page index cannot be less than zero");
        }
        if (size <= 0) {
            throw new IllegalArgumentException("Page size must be greater than zero");
        }

        long totalElements = userRepository.countUsers(search);
        List<User> matchedUsers = userRepository.findUsers(page, size, search);
        List<UserResponse> content = userMapper.toUserResponseList(matchedUsers);

        int totalPages = (int) Math.ceil((double) totalElements / size);
        boolean hasNext = (page + 1) < totalPages;
        boolean hasPrevious = page > 0;

        return UserPageResponse.builder()
                .content(content)
                .page(page)
                .size(size)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .hasNext(hasNext)
                .hasPrevious(hasPrevious)
                .build();
    }

    @Override
    public UserResponse updateUser(UUID id, UpdateUserRequest request) {
        if (id == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        if (request == null) {
            throw new IllegalArgumentException("Update request cannot be null");
        }

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        User updatedUser = userRepository.save(user);
        return userMapper.toUserResponse(updatedUser);
    }

    @Override
    public void deleteUser(UUID id) {
        if (id == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }

        if (userRepository.findById(id).isEmpty()) {
            throw new ResourceNotFoundException("User not found with ID: " + id);
        }

        userRepository.deleteById(id);
    }

    @Override
    public UserResponse addAddress(UUID userId, CreateAddressRequest request) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        if (request == null) {
            throw new IllegalArgumentException("Address creation request cannot be null");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        Address address = userMapper.toAddress(request);
        user.addAddress(address);

        User updatedUser = userRepository.save(user);
        return userMapper.toUserResponse(updatedUser);
    }

    @Override
    public UserResponse updateAddress(UUID userId, UUID addressId, UpdateAddressRequest request) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        if (addressId == null) {
            throw new IllegalArgumentException("Address ID cannot be null");
        }
        if (request == null) {
            throw new IllegalArgumentException("Address update request cannot be null");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        List<Address> currentAddresses = user.getAddresses();
        Address addressToUpdate = currentAddresses.stream()
                .filter(addr -> addressId.equals(addr.getId()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Address not found with ID: " + addressId + " for user ID: " + userId));

        addressToUpdate.setStreet(request.getStreet());
        addressToUpdate.setCity(request.getCity());
        addressToUpdate.setState(request.getState());
        addressToUpdate.setCountry(request.getCountry());
        addressToUpdate.setPostalCode(request.getPostalCode());

        user.setAddresses(currentAddresses);
        User updatedUser = userRepository.save(user);
        return userMapper.toUserResponse(updatedUser);
    }

    @Override
    public UserResponse removeAddress(UUID userId, UUID addressId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        if (addressId == null) {
            throw new IllegalArgumentException("Address ID cannot be null");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        boolean removed = user.removeAddress(addressId);
        if (!removed) {
            throw new ResourceNotFoundException(
                    "Address not found with ID: " + addressId + " for user ID: " + userId);
        }

        User updatedUser = userRepository.save(user);
        return userMapper.toUserResponse(updatedUser);
    }
}
