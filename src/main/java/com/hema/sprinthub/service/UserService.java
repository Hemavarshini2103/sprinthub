package com.hema.sprinthub.service;
import java.util.List;
import com.hema.sprinthub.entity.User;
import com.hema.sprinthub.dto.UserResponseDTO;
import com.hema.sprinthub.dto.LoginRequestDTO;
import com.hema.sprinthub.dto.LoginResponseDTO;
public interface UserService {

	UserResponseDTO registerUser(User user);
	LoginResponseDTO login(LoginRequestDTO loginRequest);
	List<UserResponseDTO> getAllUsers();
}