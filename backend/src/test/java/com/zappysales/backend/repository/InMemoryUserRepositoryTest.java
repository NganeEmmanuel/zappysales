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
        List<User> users = userRepository.findUsers(0, 10, "");

        // Assert
        assertEquals(3, users.size());
        
        // Assert first user
        Optional<User> emmanuel = userRepository.findByEmail("emmanuel.ngane@example.cm");
        assertTrue(emmanuel.isPresent());
        assertEquals("Emmanuel", emmanuel.get().getFirstName());
        assertEquals(2, emmanuel.get().getAddresses().size());

        // Assert second user
        Optional<User> jean = userRepository.findByEmail("jean.mbappe@example.cm");
        assertTrue(jean.isPresent());
        assertEquals("Jean", jean.get().getFirstName());
        assertEquals(2, jean.get().getAddresses().size());

        // Assert third user
        Optional<User> marie = userRepository.findByEmail("marie.ngo@example.cm");
        assertTrue(marie.isPresent());
        assertEquals("Marie", marie.get().getFirstName());
        assertEquals(2, marie.get().getAddresses().size());
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
        Optional<User> userUpper = userRepository.findByEmail("EMMANUEL.NGANE@EXAMPLE.CM");
        Optional<User> userLower = userRepository.findByEmail("emmanuel.ngane@example.cm");

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
        Optional<User> optUser = userRepository.findByEmail("emmanuel.ngane@example.cm");
        assertTrue(optUser.isPresent());
        User emmanuel = optUser.get();
        emmanuel.setFirstName("Emma");

        // Act
        userRepository.save(emmanuel);

        // Assert
        Optional<User> updatedEmmanuel = userRepository.findById(emmanuel.getId());
        assertTrue(updatedEmmanuel.isPresent());
        assertEquals("Emma", updatedEmmanuel.get().getFirstName());
        
        // Ensure changing the returned object does not modify repo data until save is called
        updatedEmmanuel.get().setFirstName("ShouldNotBeInRepo");
        Optional<User> emmanuelCheck = userRepository.findById(emmanuel.getId());
        assertTrue(emmanuelCheck.isPresent());
        assertEquals("Emma", emmanuelCheck.get().getFirstName());
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
        Optional<User> emmanuel = userRepository.findByEmail("emmanuel.ngane@example.cm");
        assertTrue(emmanuel.isPresent());
        UUID id = emmanuel.get().getId();

        // Act
        userRepository.deleteById(id);

        // Assert
        assertFalse(userRepository.findById(id).isPresent());
        assertEquals(2, userRepository.findUsers(0, 10, "").size());
    }

    @Test
    void findUsers_Pagination_Works() {
        // Act - Page 0, Size 2
        List<User> page0 = userRepository.findUsers(0, 2, "");
        // Act - Page 1, Size 2
        List<User> page1 = userRepository.findUsers(1, 2, "");

        // Assert
        assertEquals(2, page0.size());
        assertEquals(1, page1.size());
        
        // Assert items are different (pagination offset works)
        assertNotEquals(page0.get(0).getId(), page1.get(0).getId());
    }

    @Test
    void findUsers_Search_FirstName() {
        // Act
        List<User> results = userRepository.findUsers(0, 10, "Jean");

        // Assert
        assertEquals(1, results.size());
        assertEquals("Jean", results.get(0).getFirstName());
    }

    @Test
    void findUsers_Search_LastName() {
        // Act
        List<User> results = userRepository.findUsers(0, 10, "Mbappe");

        // Assert
        assertEquals(1, results.size());
        assertEquals("Mbappe", results.get(0).getLastName());
    }

    @Test
    void findUsers_Search_Email() {
        // Act
        List<User> results = userRepository.findUsers(0, 10, "marie.n");

        // Assert
        assertEquals(1, results.size());
        assertEquals("marie.ngo@example.cm", results.get(0).getEmail());
    }

    @Test
    void findUsers_Search_CaseInsensitive() {
        // Act
        List<User> results = userRepository.findUsers(0, 10, "nG");

        // Assert
        assertEquals(2, results.size()); // matches Ngane and Ngo
    }

    @Test
    void findUsers_PageBoundaries_ReturnsEmpty() {
        // Act - Page index out of bounds
        List<User> results = userRepository.findUsers(5, 10, "");

        // Assert
        assertTrue(results.isEmpty());
    }

    @Test
    void findUsers_EmptyResult_ForUnmatchedQuery() {
        // Act
        List<User> results = userRepository.findUsers(0, 10, "NonExistentNameString");

        // Assert
        assertTrue(results.isEmpty());
    }

    @Test
    void countUsers_ReturnsCorrectCount() {
        // Act & Assert
        assertEquals(3, userRepository.countUsers(""));
        assertEquals(2, userRepository.countUsers("ng"));
        assertEquals(0, userRepository.countUsers("NonExistentNameString"));
    }
}
