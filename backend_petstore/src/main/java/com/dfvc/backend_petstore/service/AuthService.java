package com.dfvc.backend_petstore.service;

import com.dfvc.backend_petstore.dto.request.LoginRequestDTO;
import com.dfvc.backend_petstore.dto.request.RegisterRequestDTO;
import com.dfvc.backend_petstore.dto.response.AuthResponseDTO;
import com.dfvc.backend_petstore.dto.response.MessageResponseDTO;
import com.dfvc.backend_petstore.model.User;
import com.dfvc.backend_petstore.repository.UserRepository;
import com.dfvc.backend_petstore.security.JwtUtils;
import com.dfvc.backend_petstore.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    public AuthResponseDTO authenticateUser(LoginRequestDTO loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return new AuthResponseDTO(
                jwt,
                userDetails.getId(),
                userDetails.getEmail(),
                userDetails.getFirstName(),
                userDetails.getLastName(),
                userDetails.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "")
        );
    }

    public MessageResponseDTO registerUser(RegisterRequestDTO registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return new MessageResponseDTO("Error: Email is already in use!");
        }

        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setPhoneNumber(registerRequest.getPhoneNumber());
        user.setRole(User.UserRole.USER);

        userRepository.save(user);

        return new MessageResponseDTO("User registered successfully!");
    }
}