package com.dfvc.backend_petstore.controller;

import com.dfvc.backend_petstore.dto.request.OrderRequestDTO;
import com.dfvc.backend_petstore.dto.response.OrderResponseDTO;
import com.dfvc.backend_petstore.security.UserDetailsImpl;
import com.dfvc.backend_petstore.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponseDTO> createOrder(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody OrderRequestDTO orderRequest) {
        return ResponseEntity.ok(orderService.createOrder(userDetails.getId(), orderRequest));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> getUserOrders(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(orderService.getUserOrders(userDetails.getId()));
    }

    @GetMapping("/{orderNumber}")
    public ResponseEntity<OrderResponseDTO> getOrderByNumber(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable String orderNumber) {
        return ResponseEntity.ok(orderService.getOrderByNumber(userDetails.getId(), orderNumber));
    }
}