package com.zappysales.backend.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

/**
 * Response DTO representing a paginated and filtered list of users.
 */
@Schema(description = "Response payload representing a paginated collection page of user profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserPageResponse {

    @Schema(description = "Collection of user profile elements on the current page")
    private List<UserResponse> content;

    @Schema(description = "0-based index of the current page", example = "0")
    private int page;

    @Schema(description = "Number of elements requested per page", example = "10")
    private int size;

    @Schema(description = "Total number of elements matching the query constraints", example = "30")
    private long totalElements;

    @Schema(description = "Total page count based on page size and matching records", example = "3")
    private int totalPages;

    @Schema(description = "True if there is a next page available", example = "true")
    private boolean hasNext;

    @Schema(description = "True if there is a previous page available", example = "false")
    private boolean hasPrevious;
}
