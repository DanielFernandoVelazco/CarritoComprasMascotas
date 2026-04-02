package com.dfvc.backend_petstore.controller;

import com.dfvc.backend_petstore.dto.request.CartItemRequestDTO;
import com.dfvc.backend_petstore.dto.response.CartItemResponseDTO;
import com.dfvc.backend_petstore.security.UserDetailsImpl;
import com.dfvc.backend_petstore.service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartItemResponseDTO>> getCart(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(cartService.getCartItems(userDetails.getId()));
    }

    @PostMapping
    public ResponseEntity<CartItemResponseDTO> addToCart(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody CartItemRequestDTO request) {
        return ResponseEntity.ok(cartService.addToCart(userDetails.getId(), request));
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<CartItemResponseDTO> updateCartItem(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long itemId,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.updateCartItem(userDetails.getId(), itemId, quantity));
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> removeFromCart(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long itemId) {
        cartService.removeFromCart(userDetails.getId(), itemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        cartService.clearCart(userDetails.getId());
        return ResponseEntity.noContent().build();
    }
}