package com.zappysales.backend.repository;

import com.zappysales.backend.model.Address;
import com.zappysales.backend.model.User;
import com.zappysales.backend.repository.impl.InMemoryUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for {@link InMemoryUserRepository}.
 */
class InMemoryUserRepositoryTest {

    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository = new InMemoryUserRepository();
    }

    @Test
    void initializeSampleData_VerifiesThreeUsersInitialized() {
        // Act
        List<User> users = userRepository.findAll();

        // Assert
        assertEquals(3, users.size());
        
        // Assert first user
        Optional<User> john = userRepository.findByEmail("john.doe@example.com");
        assertTrue(john.isPresent());
        assertEquals("John", john.get().getFirstName());
        assertEquals(2, john.get().getAddresses().size());

        // Assert second user
        Optional<User> jane = userRepository.findByEmail("jane.smith@example.com");
        assertTrue(jane.isPresent());
        assertEquals("Jane", jane.get().getFirstName());
        assertEquals(2, jane.get().getAddresses().size());

        // Assert third user
        Optional<User> robert = userRepository.findByEmail("robert.j@example.com");
        assertTrue(robert.isPresent());
        assertEquals("Robert", robert.get().getFirstName());
        assertEquals(2, robert.get().getAddresses().size());
    }

    @Test
    void findById_ReturnsEmptyForNonExistentId() {
        // Act
        Optional<User> user = userRepository.findById(UUID.randomUUID());

        // Assert
        assertFalse(user.isPresent());
    }

    @Test
    void findByEmail_CaseInsensitiveSuccess() {
        // Act
        Optional<User> userUpper = userRepository.findByEmail("JOHN.DOE@EXAMPLE.COM");
        Optional<User> userLower = userRepository.findByEmail("john.doe@example.com");

        // Assert
        assertTrue(userUpper.isPresent());
        assertTrue(userLower.isPresent());
        assertEquals(userUpper.get().getId(), userLower.get().getId());
    }

    @Test
    void save_CreatesNewUserWithGeneratedId() {
        // Arrange
        User newUser = new User(null, "new.user@example.com", "New", "User", null);

        // Act
        User saved = userRepository.save(newUser);

        // Assert
        assertNotNull(saved.getId());
        assertEquals("new.user@example.com", saved.getEmail());
        
        // Verify in repository
        Optional<User> retrieved = userRepository.findById(saved.getId());
        assertTrue(retrieved.isPresent());
        assertEquals("New", retrieved.get().getFirstName());
    }

    @Test
    void save_UpdatesExistingUserAndDeepClones() {
        // Arrange
        Optional<User> optUser = userRepository.findByEmail("john.doe@example.com");
        assertTrue(optUser.isPresent());
        User john = optUser.get();
        john.setFirstName("Johnny");

        // Act
        userRepository.save(john);

        // Assert
        Optional<User> updatedJohn = userRepository.findById(john.getId());
        assertTrue(updatedJohn.isPresent());
        assertEquals("Johnny", updatedJohn.get().getFirstName());
        
        // Ensure changing the returned object does not modify repo data until save is called
        updatedJohn.get().setFirstName("ShouldNotBeInRepo");
        Optional<User> johnCheck = userRepository.findById(john.getId());
        assertTrue(johnCheck.isPresent());
        assertEquals("Johnny", johnCheck.get().getFirstName());
    }

    @Test
    void save_GeneratesIdForNewAddresses() {
        // Arrange
        User newUser = new User(null, "addr.test@example.com", "Addr", "Test", null);
        List<Address> addresses = new ArrayList<>();
        addresses.add(new Address(null, "Street", "City", "State", "Country", "12345"));
        newUser.setAddresses(addresses);

        // Act
        User saved = userRepository.save(newUser);

        // Assert
        assertNotNull(saved.getId());
        assertEquals(1, saved.getAddresses().size());
        assertNotNull(saved.getAddresses().get(0).getId());
    }

    @Test
    void deleteById_RemovesUser() {
        // Arrange
        Optional<User> john = userRepository.findByEmail("john.doe@example.com");
        assertTrue(john.isPresent());
        UUID id = john.get().getId();

        // Act
        userRepository.deleteById(id);

        // Assert
        assertFalse(userRepository.findById(id).isPresent());
        assertEquals(2, userRepository.findAll().size());
    }
}
