package com.deck.users.services;

import com.deck.users.dto.UserDTO;
import com.deck.users.models.User;
import org.springframework.security.provisioning.UserDetailsManager;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsManager {
    List<User> findAll();
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
    List<User> getUsersByIds(Iterable<Long> ids);
    User save(User user);
    UserDTO save(UserDTO user);
    UserDTO updateUser(UserDTO user, Long userId);
    void delete(Long id);
}
