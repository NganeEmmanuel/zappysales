package com.zappysales.backend.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

/**
 * Response DTO representing address details.
 */
@Schema(description = "Response payload representing details of a user address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
@ToString
public class AddressResponse {

    @Schema(description = "Unique UUID identifier of the address", example = "11111111-1111-1111-1111-222222222222")
    private UUID id;

    @Schema(description = "Street address line details", example = "Rue Tokoto, Bonapriso")
    private String street;

    @Schema(description = "City of residence", example = "Douala")
    private String city;

    @Schema(description = "State, province, or region", example = "Littoral")
    private String state;

    @Schema(description = "Country of origin", example = "Cameroon")
    private String country;

    @Schema(description = "Postal or zip code registration identifier", example = "BP 1024")
    private String postalCode;
}
