package com.deck.users.repositories;

import com.deck.users.models.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByEmail(String email);
    List<User> findByUsernameContaining(String username, Pageable pageable);
    boolean existsByEmail(String email);

}
