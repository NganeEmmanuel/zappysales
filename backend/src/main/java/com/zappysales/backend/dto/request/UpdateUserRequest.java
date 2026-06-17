package com.zappysales.backend.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import com.zappysales.backend.validation.SanitizedString;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Request DTO for updating an existing user's information.
 */
@Schema(description = "Request body payload for updating basic user profile information")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateUserRequest {

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
}
