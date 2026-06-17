package com.zappysales.backend.integration;

import tools.jackson.databind.ObjectMapper;
import com.zappysales.backend.dto.request.CreateAddressRequest;
import com.zappysales.backend.dto.request.CreateUserRequest;
import com.zappysales.backend.dto.request.UpdateAddressRequest;
import com.zappysales.backend.dto.request.UpdateUserRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * End-to-end integration tests for ZappySales API and infrastructure.
 * Set rate limit capacity to 5 for easy testing of request throttling.
 */
@SpringBootTest(properties = {
        "app.rate-limit.capacity=10",
        "app.rate-limit.time-window-seconds=10"
})
@AutoConfigureMockMvc
class UserIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private com.zappysales.backend.config.RateLimitingFilter rateLimitingFilter;

    @org.junit.jupiter.api.BeforeEach
    void setUp() {
        rateLimitingFilter.reset();
    }

    @Test
    void testFullUserLifecycleAndWorkflow() throws Exception {
        // 1. Get all users (should return the 3 sample users initialized by default inside a page wrapper)
        mockMvc.perform(get("/api/v1/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(3))
                .andExpect(jsonPath("$.content[0].email").value("john.doe@example.com"))
                .andExpect(jsonPath("$.totalElements").value(3))
                .andExpect(jsonPath("$.page").value(0))
                .andExpect(jsonPath("$.size").value(10));

        // 2. Retrieve a specific user (John Doe)
        UUID johnId = UUID.fromString("11111111-1111-1111-1111-111111111111");
        mockMvc.perform(get("/api/v1/users/{userId}", johnId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.addresses.length()").value(2));

        // 3. Create a new user
        CreateUserRequest createRequest = new CreateUserRequest("test.integration@example.com", "Test", "User", new ArrayList<>());
        String responseJson = mockMvc.perform(post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value("test.integration@example.com"))
                .andExpect(jsonPath("$.id").exists())
                .andReturn().getResponse().getContentAsString();

        UUID createdUserId = UUID.fromString(objectMapper.readTree(responseJson).get("id").asText());

        // 4. Update the created user's names
        UpdateUserRequest updateRequest = new UpdateUserRequest("UpdatedTest", "UpdatedUser");
        mockMvc.perform(put("/api/v1/users/{userId}", createdUserId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("UpdatedTest"))
                .andExpect(jsonPath("$.lastName").value("UpdatedUser"));

        // 5. Add an address to the updated user
        CreateAddressRequest createAddressRequest = new CreateAddressRequest("999 Integration Rd", "Tech City", "TC", "US", "10101");
        String userWithAddressJson = mockMvc.perform(post("/api/v1/users/{userId}/addresses", createdUserId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createAddressRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.addresses.length()").value(1))
                .andExpect(jsonPath("$.addresses[0].street").value("999 Integration Rd"))
                .andReturn().getResponse().getContentAsString();

        UUID createdAddressId = UUID.fromString(
                objectMapper.readTree(userWithAddressJson).get("addresses").get(0).get("id").asText()
        );

        // 6. Update the address
        UpdateAddressRequest updateAddressRequest = new UpdateAddressRequest("888 Updated Integration Rd", "Tech City", "TC", "US", "10101");
        mockMvc.perform(put("/api/v1/users/{userId}/addresses/{addressId}", createdUserId, createdAddressId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateAddressRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.addresses[0].street").value("888 Updated Integration Rd"));

        // 7. Remove the address
        mockMvc.perform(delete("/api/v1/users/{userId}/addresses/{addressId}", createdUserId, createdAddressId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.addresses").isEmpty());
    }

    @Test
    void testDuplicateEmailCollisionReturns409() throws Exception {
        // Try to create a user with email john.doe@example.com (which already exists)
        CreateUserRequest createRequest = new CreateUserRequest("john.doe@example.com", "John", "Doe", new ArrayList<>());
        mockMvc.perform(post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.status").value(409))
                .andExpect(jsonPath("$.error").value("Conflict"))
                .andExpect(jsonPath("$.message").value("A user with email 'john.doe@example.com' already exists"));
    }

    @Test
    void testCorsHeadersArePresent() throws Exception {
        mockMvc.perform(options("/api/v1/users")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "http://localhost:3000"))
                .andExpect(status().isOk())
                .andExpect(header().exists("Access-Control-Allow-Origin"))
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:3000"))
                .andExpect(header().string("Access-Control-Allow-Credentials", "true"));
    }

    @Test
    void testRateLimiterBlocksRequestsExceedingLimit() throws Exception {
        UUID johnId = UUID.fromString("11111111-1111-1111-1111-111111111111");

        // The property configuration app.rate-limit.capacity is set to 10.
        // We will make 10 requests which should all succeed (200 OK).
        for (int i = 0; i < 10; i++) {
            mockMvc.perform(get("/api/v1/users/{userId}", johnId))
                    .andExpect(status().isOk());
        }

        // The 11th request from the same IP (MockMvc client) should be throttled and return HTTP 429.
        mockMvc.perform(get("/api/v1/users/{userId}", johnId))
                .andExpect(status().isTooManyRequests())
                .andExpect(jsonPath("$.status").value(429))
                .andExpect(jsonPath("$.error").value("Too Many Requests"))
                .andExpect(jsonPath("$.message").value("API request limit exceeded. Please try again later."));
    }
}
