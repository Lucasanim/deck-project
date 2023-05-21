package com.deck.users.config.security;

import com.deck.users.dto.TokenDTO;
import com.deck.users.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
public class TokenGenerator {
    @Autowired
    JwtEncoder accessTokenEncoder;

    @Autowired
    @Qualifier("jwtRefreshTokenEncoder")
    JwtEncoder refreshTokenEncoder;

    @Value("${jwt.issuer}") String jwtIssuer;

    private String createAccessToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Instant now = Instant.now();

        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer("myApp")
                .issuedAt(now)
                .expiresAt(now.plus(5, ChronoUnit.MINUTES))
                .subject(user.getId().toString())
                .build();

        return accessTokenEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();
    }

    private String createRefreshToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Instant now = Instant.now();

        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer(jwtIssuer)
                .issuedAt(now)
                .expiresAt(now.plus(30, ChronoUnit.DAYS))
                .subject(user.getId().toString())
                .build();

        return refreshTokenEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();
    }


    public TokenDTO createToken(Authentication authentication) {
        if (!(authentication.getPrincipal() instanceof User)) {
            throw new BadCredentialsException("Principal is not of User type");
        }

        TokenDTO tokenDTO = new TokenDTO();
        tokenDTO.setUserId(((User) authentication.getPrincipal()).getId().toString());
        tokenDTO.setAccessToken(createAccessToken(authentication));

        String refreshToken;
        if (authentication.getCredentials() instanceof Jwt) {
            Jwt jwt = (Jwt) authentication.getCredentials();
            Instant now = Instant.now();
            Instant expiresAt = jwt.getExpiresAt();
            Duration duration = Duration.between(now, expiresAt);
            long daysUntilExpires = duration.toDays();
            if (daysUntilExpires < 7) {
                refreshToken = createRefreshToken(authentication);
            } else {
                refreshToken = jwt.getTokenValue();
            }
        } else {
            refreshToken = createRefreshToken(authentication);
        }
        tokenDTO.setRefreshToken(refreshToken);

        return tokenDTO;
    }
}
