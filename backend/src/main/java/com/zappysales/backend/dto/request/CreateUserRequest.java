package com.zappysales.backend.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import com.zappysales.backend.validation.SanitizedString;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Request DTO for creating a new user.
 */
@Schema(description = "Request body payload for registering a new user profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUserRequest {

    @Schema(description = "Unique email address of the user profile", requiredMode = Schema.RequiredMode.REQUIRED, example = "emmanuel.ngane@example.cm")
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be a valid email address")
    @Size(max = 100, message = "Email must not exceed 100 characters")
    @SanitizedString(strict = true)
    private String email;

    @Schema(description = "First name of the user", requiredMode = Schema.RequiredMode.REQUIRED, example = "Emmanuel")
    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must not exceed 50 characters")
    @SanitizedString
    private String firstName;

    @Schema(description = "Last name of the user", requiredMode = Schema.RequiredMode.REQUIRED, example = "Ngane")
    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must not exceed 50 characters")
    @SanitizedString
    private String lastName;

    @Schema(description = "Optional list of initial addresses associated with this user profile")
    @Valid
    @Builder.Default
    private List<CreateAddressRequest> addresses = new ArrayList<>();
}
