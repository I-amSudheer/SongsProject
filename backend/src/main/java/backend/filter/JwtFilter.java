package backend.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import backend.service.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        try {

            // 1. Read Authorization header
            String authHeader = request.getHeader("Authorization");
            System.out.println("Authorization Header: " + authHeader);

            // 2. Check Bearer token
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                System.out.println("No Bearer Token Found");
                filterChain.doFilter(request, response);
                return;
            }

            // 3. Remove "Bearer "
            String token = authHeader.substring(7);
            System.out.println("JWT Token: " + token);

            // 4. Extract username
            String username = jwtService.extractUsername(token);
            System.out.println("Extracted Username: " + username);

            // 5. Authenticate if not already authenticated
            if (username != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

                System.out.println("Loading user from database...");

                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(username);

                System.out.println("Database Username: " + userDetails.getUsername());

                boolean valid =
                        jwtService.validateToken(token, userDetails.getUsername());

                System.out.println("Token Valid: " + valid);

                if (valid) {

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities());

                    authToken.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request));

                    SecurityContextHolder.getContext()
                            .setAuthentication(authToken);

                    System.out.println("Authentication Stored Successfully");
                    System.out.println("Security Context: "
                            + SecurityContextHolder.getContext().getAuthentication());

                } else {
                    System.out.println("Token Validation Failed");
                }
            }

        } catch (Exception e) {
            System.out.println("JWT Filter Exception:");
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }
}