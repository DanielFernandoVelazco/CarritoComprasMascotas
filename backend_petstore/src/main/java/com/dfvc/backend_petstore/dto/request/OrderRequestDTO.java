package com.dfvc.backend_petstore.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OrderRequestDTO {

    @NotBlank
    private String shippingAddress;

    @NotBlank
    private String paymentMethod;
}