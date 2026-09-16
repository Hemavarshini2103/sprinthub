package com.hema.sprinthub.service.impl;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hema.sprinthub.dto.LoginRequestDTO;
import com.hema.sprinthub.dto.UserResponseDTO;
import com.hema.sprinthub.entity.User;
import com.hema.sprinthub.repository.UserRepository;
import com.hema.sprinthub.service.UserService;
import com.hema.sprinthub.dto.LoginResponseDTO;
import com.hema.sprinthub.security.JwtUtil;
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;
    @Override
    public UserResponseDTO registerUser(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        UserResponseDTO response = new UserResponseDTO();

        response.setId(savedUser.getId());
        response.setName(savedUser.getName());
        response.setEmail(savedUser.getEmail());
        response.setRole(savedUser.getRole());

        return response;
    }

    @Override
    public LoginResponseDTO login(LoginRequestDTO loginRequest) {

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid password");
        }
        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().name()
        );
        LoginResponseDTO response = new LoginResponseDTO();

        response.setToken(token);
        response.setName(user.getName());

        return response;

        
    }
    @Override
    public List<UserResponseDTO> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(user -> {

                    UserResponseDTO response = new UserResponseDTO();

                    response.setId(user.getId());
                    response.setName(user.getName());
                    response.setEmail(user.getEmail());
                    response.setRole(user.getRole());

                    return response;
                })
                .collect(Collectors.toList());
    }
}