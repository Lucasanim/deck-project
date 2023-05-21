package com.deck.discussions.filter;

import com.deck.discussions.config.security.HttpMapRequestWrapper;
import com.deck.discussions.config.security.JwtUtils;
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
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

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
