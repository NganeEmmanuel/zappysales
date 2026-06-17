package com.zappysales.backend.mapper;

import com.zappysales.backend.dto.request.CreateAddressRequest;
import com.zappysales.backend.dto.request.CreateUserRequest;
import com.zappysales.backend.dto.response.AddressResponse;
import com.zappysales.backend.dto.response.UserResponse;
import com.zappysales.backend.model.Address;
import com.zappysales.backend.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Mapper component that handles mapping between domain models and DTOs.
 */
@Component
public class UserMapper {

    /**
     * Maps a {@link User} domain model to a {@link UserResponse} DTO.
     *
     * @param user the user domain model to map
     * @return the mapped UserResponse, or null if the input is null
     */
    public UserResponse toUserResponse(User user) {
        if (user == null) {
            return null;
        }

        List<AddressResponse> addressResponses = null;
        if (user.getAddresses() != null) {
            addressResponses = user.getAddresses().stream()
                    .map(this::toAddressResponse)
                    .collect(Collectors.toList());
        }

        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                addressResponses
        );
    }

    /**
     * Maps an {@link Address} domain model to an {@link AddressResponse} DTO.
     *
     * @param address the address domain model to map
     * @return the mapped AddressResponse, or null if the input is null
     */
    public AddressResponse toAddressResponse(Address address) {
        if (address == null) {
            return null;
        }

        return new AddressResponse(
                address.getId(),
                address.getStreet(),
                address.getCity(),
                address.getState(),
                address.getCountry(),
                address.getPostalCode()
        );
    }

    /**
     * Maps a {@link CreateUserRequest} DTO to a {@link User} domain model.
     * Assigns a new random UUID to the user and its addresses.
     *
     * @param request the request containing user details
     * @return the mapped User model
     */
    public User toUser(CreateUserRequest request) {
        if (request == null) {
            return null;
        }

        List<Address> addresses = new ArrayList<>();
        if (request.getAddresses() != null) {
            for (CreateAddressRequest addrReq : request.getAddresses()) {
                addresses.add(toAddress(addrReq));
            }
        }

        return new User(
                UUID.randomUUID(),
                request.getEmail(),
                request.getFirstName(),
                request.getLastName(),
                addresses
        );
    }

    /**
     * Maps a {@link CreateAddressRequest} DTO to an {@link Address} domain model.
     * Assigns a new random UUID to the address.
     *
     * @param request the request containing address details
     * @return the mapped Address model
     */
    public Address toAddress(CreateAddressRequest request) {
        if (request == null) {
            return null;
        }

        return new Address(
                UUID.randomUUID(),
                request.getStreet(),
                request.getCity(),
                request.getState(),
                request.getCountry(),
                request.getPostalCode()
        );
    }

    /**
     * Maps a list of {@link User} models to a list of {@link UserResponse} DTOs.
     *
     * @param users the list of user domain models
     * @return the list of mapped user responses
     */
    public List<UserResponse> toUserResponseList(List<User> users) {
        if (users == null) {
            return new ArrayList<>();
        }
        return users.stream()
                .map(this::toUserResponse)
                .collect(Collectors.toList());
    }
}
