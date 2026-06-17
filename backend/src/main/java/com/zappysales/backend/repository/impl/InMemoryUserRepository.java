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
        String[] firstNames = {
            "Emmanuel", "Jean", "Marie", "Pierre", "Joseph", 
            "Paul", "Samuel", "David", "Chantal", "Florence", 
            "Esther", "Ruth", "Lucas", "Marc", "Daniel", 
            "Alain", "Eric", "Pascal", "Olivier", "Christian", 
            "Henri", "Robert", "Therese", "Jeanne", "Alice", 
            "Cecile", "Sophie", "Catherine", "Anne", "Antoine"
        };
        String[] lastNames = {
            "Ngane", "Mbappe", "Ngo", "Eto'o", "Song", 
            "Abega", "Milla", "Toko", "Nkono", "N'Koulou", 
            "Anguissa", "Onana", "Choupo", "Toko-Ekambi", "Kameni", 
            "Wome", "Geremi", "Mboma", "Foe", "Kalla", 
            "Biyik", "Kunde", "N'Gadjui", "Tchakounte", "Nguema", 
            "Kamga", "Talla", "Fosso", "Simba", "Youmbi"
        };

        String[][] cities = {
            {"Douala", "Littoral"},
            {"Yaounde", "Centre"},
            {"Buea", "South West"},
            {"Limbe", "South West"},
            {"Bafoussam", "West"},
            {"Bamenda", "North West"},
            {"Garoua", "North"},
            {"Maroua", "Far North"},
            {"Ngaoundere", "Adamawa"},
            {"Bertoua", "East"}
        };

        // User 1 must be exactly Emmanuel Ngane with specific ID so tests can find it by constant ID
        User user1 = new User(
                UUID.fromString("11111111-1111-1111-1111-111111111111"),
                "emmanuel.ngane@example.cm",
                "Emmanuel",
                "Ngane",
                null
        );
        user1.addAddress(new Address(
                UUID.fromString("11111111-1111-1111-1111-222222222222"),
                "Rue Tokoto, Bonapriso",
                "Douala",
                "Littoral",
                "Cameroon",
                "BP 1024"
        ));
        user1.addAddress(new Address(
                UUID.fromString("11111111-1111-1111-1111-333333333333"),
                "Avenue Charles de Gaulle",
                "Yaounde",
                "Centre",
                "Cameroon",
                "BP 2030"
        ));
        save(user1);

        // Generate the other 29 users programmatically
        for (int i = 1; i < 30; i++) {
            String firstName = firstNames[i];
            String lastName = lastNames[i];
            String email = firstName.toLowerCase() + "." + lastName.toLowerCase().replace("'", "") + "@example.cm";
            
            // Generate some deterministic UUIDs so they are consistent
            UUID userId = new UUID(0x2222222222222222L + i, 0x2222222222222222L + i);

            User user = new User(userId, email, firstName, lastName, null);

            // Give them two addresses based on their index
            int cityIdx1 = (i * 2) % cities.length;
            int cityIdx2 = (i * 2 + 1) % cities.length;

            user.addAddress(new Address(
                    new UUID(0x3333333333333333L + i, 0x1111111111111111L + i),
                    "Street " + (i * 10 + 1),
                    cities[cityIdx1][0],
                    cities[cityIdx1][1],
                    "Cameroon",
                    "BP " + (i * 5)
            ));
            user.addAddress(new Address(
                    new UUID(0x3333333333333333L + i, 0x2222222222222222L + i),
                    "Street " + (i * 10 + 2),
                    cities[cityIdx2][0],
                    cities[cityIdx2][1],
                    "Cameroon",
                    "BP " + (i * 5 + 1)
            ));
            save(user);
        }
    }
}
