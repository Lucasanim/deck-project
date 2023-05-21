package com.deck.users.filter;

import com.deck.users.config.security.HttpMapRequestWrapper;
import com.deck.users.config.security.JwtUtils;
import com.nimbusds.jose.shaded.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
public class AuthFilter extends OncePerRequestFilter {

    @Autowired
    JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final Optional<String> authTokenOpt = jwtUtils.getTokenFromRequest(request);
        if (authTokenOpt.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }

        HttpMapRequestWrapper requestWrapper = new HttpMapRequestWrapper(request);
        String userId;
        try {
            userId = jwtUtils.getUserIdFromJwt(authTokenOpt.get());
        } catch (Exception e) {
            filterChain.doFilter(request, response);
            return;
        }

        requestWrapper.addHeader("userId", userId);
        filterChain.doFilter(requestWrapper, response);
    }
}
