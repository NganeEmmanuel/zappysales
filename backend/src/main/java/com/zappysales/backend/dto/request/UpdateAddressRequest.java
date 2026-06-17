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
 * Request DTO for updating an existing address.
 */
@Schema(description = "Request body payload for updating address details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateAddressRequest {

    @Schema(description = "Street address line details", requiredMode = Schema.RequiredMode.REQUIRED, example = "Rue Tokoto, Bonapriso")
    @NotBlank(message = "Street is required")
    @Size(max = 150, message = "Street must not exceed 150 characters")
    @SanitizedString
    private String street;

    @Schema(description = "City of residence", requiredMode = Schema.RequiredMode.REQUIRED, example = "Douala")
    @NotBlank(message = "City is required")
    @Size(max = 100, message = "City must not exceed 100 characters")
    @SanitizedString
    private String city;

    @Schema(description = "State, province, or region", requiredMode = Schema.RequiredMode.REQUIRED, example = "Littoral")
    @NotBlank(message = "State is required")
    @Size(max = 100, message = "State must not exceed 100 characters")
    @SanitizedString
    private String state;

    @Schema(description = "Country of origin", requiredMode = Schema.RequiredMode.REQUIRED, example = "Cameroon")
    @NotBlank(message = "Country is required")
    @Size(max = 100, message = "Country must not exceed 100 characters")
    @SanitizedString
    private String country;

    @Schema(description = "Postal or zip code registration identifier", requiredMode = Schema.RequiredMode.REQUIRED, example = "BP 1024")
    @NotBlank(message = "Postal code is required")
    @Size(max = 20, message = "Postal code must not exceed 20 characters")
    @SanitizedString
    private String postalCode;
}
