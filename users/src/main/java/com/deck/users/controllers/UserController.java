package com.deck.users.controllers;

import com.deck.users.dto.PublicUserDTO;
import com.deck.users.dto.UserDTO;
import com.deck.users.exception.EmailAlreadyInUseException;
import com.deck.users.models.User;
import com.deck.users.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.*;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<PublicUserDTO> getUserById(@PathVariable("userId") Long id) {
        Optional<User> optionalUser = this.userService.findById(id);
        return optionalUser.map(user -> ResponseEntity.ok(PublicUserDTO.from(user))).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return this.getValidationErrorResponse(bindingResult);
        }
        if (this.userService.userExists(user.getEmail())) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "The email provided is already taken"));
        }
        UserDTO createdUser = this.userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PutMapping
    public ResponseEntity<?> updateUser(@Valid @RequestBody UserDTO user, BindingResult bindingResult, @RequestHeader Long userId) {
        if (bindingResult.hasErrors()) {
            return this.getValidationErrorResponse(bindingResult);
        }
        try {
            UserDTO userDTO = userService.updateUser(user, userId);
            return ResponseEntity.status(HttpStatus.OK).body(userDTO);
        } catch (EmailAlreadyInUseException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "The email provided is already taken"));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser(@RequestHeader Long userId) {
        Optional<User> optionalUser = this.userService.findById(userId);
        if (optionalUser.isPresent()) {
            this.userService.delete(userId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/users-by-id")
    public ResponseEntity<List<PublicUserDTO>> getUsersByIds(@RequestBody List<Long> usersIds) {
        return ResponseEntity.ok(this.userService.getUsersByIds(usersIds).stream().map(PublicUserDTO::from).toList());
    }
    private ResponseEntity<Map<String, String>> getValidationErrorResponse(BindingResult bindingResult) {
        Map<String, String> errors = new HashMap<>();
        bindingResult.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }

}
