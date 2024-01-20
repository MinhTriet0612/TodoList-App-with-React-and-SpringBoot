package org.example.fullstackbackend.backendapplication.repository;

import org.example.fullstackbackend.backendapplication.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findUserByEmail(String theEmail);
}
