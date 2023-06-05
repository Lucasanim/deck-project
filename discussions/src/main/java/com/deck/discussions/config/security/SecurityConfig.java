package com.deck.discussions.config.security;

import com.deck.discussions.filter.JwtTokenFilter;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    JwtToUserConverter jwtToUserConverter;
    @Autowired
    KeyUtils keyUtils;
    @Autowired
    JwtTokenFilter jwtTokenFilter;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authorize) -> authorize
                        .anyRequest().authenticated()
                )
                .csrf().disable()
                .cors().disable()
                .oauth2ResourceServer((oauth2) -> oauth2
                        .jwt((jwt) -> jwt.jwtAuthenticationConverter(jwtToUserConverter))
                        .authenticationEntryPoint((request, response, exception) -> {
                            System.out.println("Authentication failed");
                            BearerTokenAuthenticationEntryPoint delegate = new BearerTokenAuthenticationEntryPoint();
                            delegate.commence(request, response, exception);
                        })
                )
                .exceptionHandling((exceptions) -> exceptions
                        .authenticationEntryPoint((request, response, exception) -> {
                            System.out.println("Authentication is required");
                            BearerTokenAuthenticationEntryPoint delegate = new BearerTokenAuthenticationEntryPoint();
                            delegate.commence(request, response, exception);
                        })
                );

        return http.build();
    }

    @Bean
    @Primary
    JwtDecoder jwtAccessTokenDecoder() {
        return NimbusJwtDecoder.withPublicKey(keyUtils.getAccessTokenPublicKey()).build();
    }

}
