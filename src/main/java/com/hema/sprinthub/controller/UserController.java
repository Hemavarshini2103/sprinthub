package com.hema.sprinthub.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hema.sprinthub.entity.User;
import com.hema.sprinthub.service.UserService;
import jakarta.validation.Valid;
import com.hema.sprinthub.dto.UserResponseDTO;
import com.hema.sprinthub.dto.LoginRequestDTO;
import com.hema.sprinthub.dto.LoginResponseDTO;
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public UserResponseDTO registerUser(@Valid @RequestBody User user) {

     

        return userService.registerUser(user);

    }
    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO loginRequest) {

        return userService.login(loginRequest);
    }
    @GetMapping
    public List<UserResponseDTO> getAllUsers() {

        return userService.getAllUsers();
    }

}