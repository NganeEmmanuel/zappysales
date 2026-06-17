package com.zappysales.backend.dto.response;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Response DTO representing user details and associated addresses.
 */
@Getter
@Setter
@Builder
@EqualsAndHashCode
@ToString
public class UserResponse {

    private UUID id;
    private String email;
    private String firstName;
    private String lastName;

    @Getter(lombok.AccessLevel.NONE)
    @Setter(lombok.AccessLevel.NONE)
    @Builder.Default
    private List<AddressResponse> addresses = new ArrayList<>();

    /**
     * Default constructor for UserResponse.
     */
    public UserResponse() {
    }

    /**
     * Constructs a new UserResponse with specified fields.
     *
     * @param id        the unique identifier of the user
     * @param email     the email address of the user
     * @param firstName the first name of the user
     * @param lastName  the last name of the user
     * @param addresses the list of addresses associated with the user
     */
    public UserResponse(UUID id, String email, String firstName, String lastName, List<AddressResponse> addresses) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.addresses = addresses != null ? new ArrayList<>(addresses) : new ArrayList<>();
    }

    /**
     * Gets the list of addresses.
     * Returns a new list to prevent direct external modification of the internal list.
     *
     * @return the list of addresses
     */
    public List<AddressResponse> getAddresses() {
        return new ArrayList<>(addresses);
    }

    /**
     * Sets the list of addresses.
     *
     * @param addresses the list of addresses to set
     */
    public void setAddresses(List<AddressResponse> addresses) {
        this.addresses = addresses != null ? new ArrayList<>(addresses) : new ArrayList<>();
    }
}
