package com.dfvc.backend_petstore.controller;

import com.dfvc.backend_petstore.dto.request.LoginRequestDTO;
import com.dfvc.backend_petstore.dto.request.RegisterRequestDTO;
import com.dfvc.backend_petstore.dto.response.AuthResponseDTO;
import com.dfvc.backend_petstore.dto.response.MessageResponseDTO;
import com.dfvc.backend_petstore.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> authenticateUser(@Valid @RequestBody LoginRequestDTO loginRequest) {
        AuthResponseDTO response = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<MessageResponseDTO> registerUser(@Valid @RequestBody RegisterRequestDTO registerRequest) {
        MessageResponseDTO response = authService.registerUser(registerRequest);
        return ResponseEntity.ok(response);
    }
}