package backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.*;
import backend.entity.UserEntity;
import backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTService jwtService;

    // checking the user existing or not
    public boolean userExists(String username) {
        return userRepository.existsByUsername(username);
    }

    // register the user
    public void register(UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
    // login the user
    public String login(UserEntity user) {

        // Find user in database
        UserEntity dbUser = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check password
        if (!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            return "Invalid Credentials";
        }

        // Generate JWT
        return jwtService.generateToken(dbUser.getUsername());
    }
    
}
