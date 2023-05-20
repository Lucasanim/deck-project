package com.deck.users.controllers;

import com.deck.users.config.security.TokenGenerator;
import com.deck.users.dto.LoginDTO;
import com.deck.users.dto.TokenDTO;
import com.deck.users.dto.UserDTO;
import com.deck.users.models.User;
import com.deck.users.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.BearerTokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private TokenGenerator tokenGenerator;
    @Autowired
    private UserService userService;
    @Autowired
    private DaoAuthenticationProvider authenticationProvider;
    @Autowired
    @Qualifier("jwtRefreshTokenAuthProvider")
    private JwtAuthenticationProvider jwtAuthenticationProvider;

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody UserDTO userDTO) {
        User user = User.from(userDTO);
        userService.createUser(user);

        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(user, user.getPassword(), new ArrayList<>());

        return ResponseEntity.ok(tokenGenerator.createToken(authentication));
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDTO loginDTO) {
        Authentication authentication = authenticationProvider.authenticate(UsernamePasswordAuthenticationToken.unauthenticated(loginDTO.getEmail(), loginDTO.getPassword()));

        return ResponseEntity.ok(tokenGenerator.createToken(authentication));
    }

    @PostMapping("/token")
    public ResponseEntity refreshToken(@RequestBody TokenDTO tokenDTO) {
        Authentication authentication = jwtAuthenticationProvider.authenticate(new BearerTokenAuthenticationToken(tokenDTO.getRefreshToken()));

        return ResponseEntity.ok(tokenGenerator.createToken(authentication));
    }
}
