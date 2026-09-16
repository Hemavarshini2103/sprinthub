package com.hema.sprinthub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.hema.sprinthub.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
}