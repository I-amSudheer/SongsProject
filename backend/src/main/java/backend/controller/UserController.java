package backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import backend.entity.UserEntity;
import backend.service.JWTService;
import backend.service.UserService;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;



@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;
 
    @GetMapping("/hello")
public String hello(Authentication authentication) {

    System.out.println(authentication);

    return "Welcome to Song Website";
}
    
    // user regestration
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserEntity user) {

        if (userService.userExists(user.getUsername())) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body("User already exists");
        }

        userService.register(user);

        return ResponseEntity.ok("Registration Successful");
    }
    // JWT api call
    @PostMapping("/login")
    public String login(@RequestBody UserEntity user) {

        // Authenticate username/password

        return userService.login(user);
    }

}

