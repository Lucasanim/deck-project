package com.deck.users.services;

import com.deck.users.dto.PublicUserDTO;
import com.deck.users.dto.UserDTO;
import com.deck.users.exception.EmailAlreadyInUseException;
import com.deck.users.models.User;
import com.deck.users.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return (List<User>) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getUsersByIds(Iterable<Long> ids) {
        return (List<User>) repository.findAllById(ids);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PublicUserDTO> searchUsersByUsername(String username, Pageable pageable) {
        List<User> users = repository.findByUsernameContaining(username, pageable);
        return users.stream().map(PublicUserDTO::from).toList();
    }

    @Override
    @Transactional
    public User save(User user) {
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        return repository.save(user);
    }

    @Override
    @Transactional
    public UserDTO save(UserDTO user) {
        return UserDTO.from(save(User.from(user)));
    }

    @Override
    @Transactional
    public UserDTO updateUser(UserDTO user, Long userId) {
        Optional<User> optionalUser = findById(userId);
        if (optionalUser.isPresent()) {
            User queriedUser = optionalUser.get();
            if (!queriedUser.getEmail().equalsIgnoreCase(user.getEmail()) && userExists(user.getEmail())) {
                throw new EmailAlreadyInUseException();
            }
            queriedUser.setEmail(user.getEmail());
            queriedUser.setPassword(user.getPassword());
            return UserDTO.from(save(queriedUser));
        }
        throw new EntityNotFoundException();
    }

    @Override
    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public void createUser(UserDetails user) {
        save((User) user);
    }

    @Override
    public void updateUser(UserDetails user) {}

    @Override
    public void deleteUser(String username) {}

    @Override
    public void changePassword(String oldPassword, String newPassword) {}

    @Override
    public boolean userExists(String username) {
        return repository.existsByEmail(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByEmail(username).orElseThrow();
    }
}
