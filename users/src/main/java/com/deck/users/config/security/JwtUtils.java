package com.deck.users.config.security;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Component
public class JwtUtils {
    @Autowired
    JwtDecoder accessTokenDecoder;

    public String getUserIdFromJwt(String jwtString) {
        Jwt jwt = accessTokenDecoder.decode(jwtString);
        return jwt.getSubject();
    }

    public Optional<String> getTokenFromRequest(HttpServletRequest request) {
        String authToken = request.getHeader("Authorization");
        if (StringUtils.isEmpty(authToken) || authToken.equals("undefined")) {
            return Optional.empty();
        }
        if (authToken.contains("Bearer ")) {
            authToken = authToken.split("Bearer ")[1];
        }

        return Optional.of(authToken);
    }
}
