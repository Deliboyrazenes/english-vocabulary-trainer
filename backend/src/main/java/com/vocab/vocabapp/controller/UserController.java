package com.vocab.vocabapp.controller;

import com.vocab.vocabapp.dto.DeleteUserRequest;
import com.vocab.vocabapp.entity.User;
import com.vocab.vocabapp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        User saved = userService.register(user);
        saved.setPassword(null);
        return saved;
    }

    // LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        Optional<User> loggedIn = userService.login(user.getEmail(), user.getPassword());
        if (loggedIn.isEmpty()) return null;

        User safe = loggedIn.get();
        safe.setPassword(null); // şifre asla gönderilmez
        return safe;
    }

    // CHANGE PASSWORD
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> body) {

        Long userId = Long.valueOf(body.get("userId"));
        String oldPass = body.get("oldPassword");
        String newPass = body.get("newPassword");

        try {
            userService.changePassword(userId, oldPass, newPass);
            return ResponseEntity.ok("Şifre güncellendi");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // UPDATE PROFILE (only name)
    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> body) {

        Long userId = Long.valueOf(body.get("userId"));
        String newName = body.get("name");

        try {
            userService.updateProfile(userId, newName);

            User updated = userService.getById(userId);
            updated.setPassword(null);

            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestBody DeleteUserRequest request) {
        try {
            userService.deleteUserWithPassword(request.getUserId(), request.getPassword());
            return ResponseEntity.ok("Kullanıcı başarıyla silindi.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }



}
