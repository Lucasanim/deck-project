package com.deck.users.controllers;

import com.deck.users.models.User;
import com.deck.users.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@RequestHeader Long userId, @PathVariable("userId") Long id) {
        Optional<User> optionalUser = this.userService.findById(id);
        if (optionalUser.isPresent()) {
            return ResponseEntity.ok(optionalUser.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return this.getValidationErrorResponse(bindingResult);
        }
        if (this.userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "The email provided is already taken"));
        }
        User createdUser = this.userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@Valid @RequestBody User user, BindingResult bindingResult, @PathVariable("userId") Long userId) {
        if (bindingResult.hasErrors()) {
            return this.getValidationErrorResponse(bindingResult);
        }
        Optional<User> optionalUser = this.userService.findById(userId);
        if (optionalUser.isPresent()) {
            User queriedUser = optionalUser.get();
            if (!queriedUser.getEmail().equalsIgnoreCase(user.getEmail()) && this.userService.findByEmail(user.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body(Collections.singletonMap("error", "The email provided is already taken"));
            }
            queriedUser.setEmail(user.getEmail());
            queriedUser.setPassword(user.getPassword());
            return ResponseEntity.status(HttpStatus.CREATED).body(this.userService.save(queriedUser));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable("userId") Long userId) {
        Optional<User> optionalUser = this.userService.findById(userId);
        if (optionalUser.isPresent()) {
            this.userService.delete(userId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/users-by-id")
    public ResponseEntity<List<User>> getUsersByIds(@RequestParam List<Long> usersIds) {
        return ResponseEntity.ok(this.userService.getUsersByIds(usersIds));
    }
    private ResponseEntity<Map<String, String>> getValidationErrorResponse(BindingResult bindingResult) {
        Map<String, String> errors = new HashMap<>();
        bindingResult.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }

}
