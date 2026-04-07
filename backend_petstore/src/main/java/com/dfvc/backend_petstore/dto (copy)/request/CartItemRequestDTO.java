package com.dfvc.backend_petstore.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CartItemRequestDTO {

    @NotNull
    private Long productId;

    @NotNull
    @Min(1)
    private Integer quantity;
}