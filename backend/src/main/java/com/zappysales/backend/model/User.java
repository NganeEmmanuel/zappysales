package com.zappysales.backend.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Domain model representing a user.
 */
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class User {

    private UUID id;
    private String email;
    private String firstName;
    private String lastName;
    
    @Getter(lombok.AccessLevel.NONE)
    @Setter(lombok.AccessLevel.NONE)
    private List<Address> addresses = new ArrayList<>();

    /**
     * Default constructor for User.
     */
    public User() {
    }

    /**
     * Constructs a new User with the specified fields.
     *
     * @param id        the unique identifier of the user
     * @param email     the email address of the user
     * @param firstName the first name of the user
     * @param lastName  the last name of the user
     * @param addresses the list of addresses associated with the user
     */
    public User(UUID id, String email, String firstName, String lastName, List<Address> addresses) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.addresses = addresses != null ? new ArrayList<>(addresses) : new ArrayList<>();
    }

    /**
     * Gets the list of addresses associated with the user.
     * Returns a new list to prevent direct external modification of the internal list.
     *
     * @return the list of addresses
     */
    public List<Address> getAddresses() {
        return new ArrayList<>(addresses);
    }

    /**
     * Sets the list of addresses associated with the user.
     *
     * @param addresses the list of addresses to set
     */
    public void setAddresses(List<Address> addresses) {
        this.addresses = addresses != null ? new ArrayList<>(addresses) : new ArrayList<>();
    }

    /**
     * Adds an address to the user's list of addresses.
     *
     * @param address the address to add
     */
    public void addAddress(Address address) {
        if (address != null) {
            this.addresses.add(address);
        }
    }

    /**
     * Removes an address from the user's list of addresses by address ID.
     *
     * @param addressId the unique identifier of the address to remove
     * @return true if the address was found and removed, false otherwise
     */
    public boolean removeAddress(UUID addressId) {
        if (addressId == null) {
            return false;
        }
        return this.addresses.removeIf(address -> addressId.equals(address.getId()));
    }
}
