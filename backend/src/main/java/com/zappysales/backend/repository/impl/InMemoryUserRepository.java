package com.zappysales.backend.repository.impl;

import com.zappysales.backend.model.Address;
import com.zappysales.backend.model.User;
import com.zappysales.backend.repository.UserRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * In-memory thread-safe implementation of {@link UserRepository}.
 * Initialized with 3 realistic sample users, each having multiple addresses.
 */
@Repository
public class InMemoryUserRepository implements UserRepository {

    private final Map<UUID, User> users = new ConcurrentHashMap<>();

    /**
     * Constructs the InMemoryUserRepository and initializes it with sample data.
     */
    public InMemoryUserRepository() {
        initializeSampleData();
    }

    @Override
    public Optional<User> findById(UUID id) {
        if (id == null) {
            return Optional.empty();
        }
        User user = users.get(id);
        return Optional.ofNullable(cloneUser(user));
    }

    @Override
    public Optional<User> findByEmail(String email) {
        if (email == null) {
            return Optional.empty();
        }
        return users.values().stream()
                .filter(user -> email.equalsIgnoreCase(user.getEmail()))
                .map(this::cloneUser)
                .findFirst();
    }

    @Override
    public List<User> findUsers(int page, int size, String search) {
        return users.values().stream()
                .filter(user -> matchesSearch(user, search))
                .skip((long) page * size)
                .limit(size)
                .map(this::cloneUser)
                .collect(Collectors.toList());
    }

    @Override
    public long countUsers(String search) {
        return users.values().stream()
                .filter(user -> matchesSearch(user, search))
                .count();
    }

    private boolean matchesSearch(User user, String search) {
        if (search == null || search.trim().isEmpty()) {
            return true;
        }
        String q = search.toLowerCase().trim();
        boolean matchesFirstName = user.getFirstName() != null && user.getFirstName().toLowerCase().contains(q);
        boolean matchesLastName = user.getLastName() != null && user.getLastName().toLowerCase().contains(q);
        boolean matchesEmail = user.getEmail() != null && user.getEmail().toLowerCase().contains(q);
        return matchesFirstName || matchesLastName || matchesEmail;
    }

    @Override
    public User save(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User to save cannot be null");
        }
        if (user.getId() == null) {
            user.setId(UUID.randomUUID());
        }
        
        // Ensure all addresses have IDs
        if (user.getAddresses() != null) {
            for (Address address : user.getAddresses()) {
                if (address.getId() == null) {
                    address.setId(UUID.randomUUID());
                }
            }
        }

        User cloned = cloneUser(user);
        users.put(cloned.getId(), cloned);
        return cloneUser(cloned);
    }

    @Override
    public void deleteById(UUID id) {
        if (id != null) {
            users.remove(id);
        }
    }

    /**
     * Creates defensive copy of a User object to isolate repository state.
     *
     * @param user the User to clone
     * @return a new User instance with copied values
     */
    private User cloneUser(User user) {
        if (user == null) {
            return null;
        }

        List<Address> clonedAddresses = new ArrayList<>();
        if (user.getAddresses() != null) {
            for (Address address : user.getAddresses()) {
                clonedAddresses.add(new Address(
                        address.getId(),
                        address.getStreet(),
                        address.getCity(),
                        address.getState(),
                        address.getCountry(),
                        address.getPostalCode()
                ));
            }
        }

        return new User(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                clonedAddresses
        );
    }

    /**
     * Initializes the repository with 3 realistic sample users.
     */
    private void initializeSampleData() {
        // User 1
        User user1 = new User(
                UUID.fromString("11111111-1111-1111-1111-111111111111"),
                "john.doe@example.com",
                "John",
                "Doe",
                null
        );
        user1.addAddress(new Address(
                UUID.fromString("11111111-1111-1111-1111-222222222222"),
                "123 Main St",
                "Springfield",
                "IL",
                "US",
                "62701"
        ));
        user1.addAddress(new Address(
                UUID.fromString("11111111-1111-1111-1111-333333333333"),
                "456 Oak Ave",
                "Chicago",
                "IL",
                "US",
                "60601"
        ));
        save(user1);

        // User 2
        User user2 = new User(
                UUID.fromString("22222222-2222-2222-2222-222222222222"),
                "jane.smith@example.com",
                "Jane",
                "Smith",
                null
        );
        user2.addAddress(new Address(
                UUID.fromString("22222222-2222-2222-2222-333333333333"),
                "789 Pine Rd",
                "Seattle",
                "WA",
                "US",
                "98101"
        ));
        user2.addAddress(new Address(
                UUID.fromString("22222222-2222-2222-2222-444444444444"),
                "101 Maple Dr",
                "Bellevue",
                "WA",
                "US",
                "98004"
        ));
        save(user2);

        // User 3
        User user3 = new User(
                UUID.fromString("33333333-3333-3333-3333-333333333333"),
                "robert.j@example.com",
                "Robert",
                "Johnson",
                null
        );
        user3.addAddress(new Address(
                UUID.fromString("33333333-3333-3333-3333-444444444444"),
                "202 Cedar Ln",
                "Austin",
                "TX",
                "US",
                "78701"
        ));
        user3.addAddress(new Address(
                UUID.fromString("33333333-3333-3333-3333-555555555555"),
                "303 Birch Blvd",
                "Dallas",
                "TX",
                "US",
                "75201"
        ));
        save(user3);
    }
}
