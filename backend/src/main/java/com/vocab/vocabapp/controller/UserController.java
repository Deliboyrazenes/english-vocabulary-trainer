package com.vocab.vocabapp.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vocab.vocabapp.dto.AuthResponse;
import com.vocab.vocabapp.dto.DeleteUserRequest;
import com.vocab.vocabapp.entity.User;
import com.vocab.vocabapp.security.JwtService;
import com.vocab.vocabapp.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    private Long getUserIdFromToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            return null;
        }

        String token = header.substring(7);
        return jwtService.extractUserId(token);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            userService.register(user);
            return ResponseEntity.ok(Map.of("message", "Kayıt başarılı! Lütfen mail adresinize gelen 6 haneli kodu girerek hesabınızı doğrulayın."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody Map<String, String> body) {
        try {
            userService.confirmVerification(body.get("email"), body.get("code"));
            return ResponseEntity.ok(Map.of("message", "Hesap başarıyla doğrulandı. Artık giriş yapabilirsiniz."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/resend-code")
    public ResponseEntity<?> resendCode(@RequestBody Map<String, String> body) {
        try {
            userService.resendVerificationCode(body.get("email"));
            return ResponseEntity.ok(Map.of("message", "Yeni doğrulama kodu başarıyla gönderildi."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            Optional<User> found = userService.login(user.getEmail(), user.getPassword());

            if (found.isEmpty()) {
                return ResponseEntity.status(401).body(Map.of("error", "Email veya şifre hatalı"));
            }

            User u = found.get();
            String token = jwtService.generateToken(u.getEmail(), u.getId());

            return ResponseEntity.ok(new AuthResponse(token, u.getId(), u.getEmail(), u.getName()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Sunucu hatası: " + e.getMessage()));
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(HttpServletRequest request, @RequestBody Map<String, String> body) {

        Long userId = getUserIdFromToken(request);

        try {
            userService.changePassword(
                    userId,
                    body.get("oldPassword"),
                    body.get("newPassword")
            );
            return ResponseEntity.ok(Map.of("message", "Şifre güncellendi"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(HttpServletRequest request, @RequestBody Map<String, String> body) {

        Long userId = getUserIdFromToken(request);

        try {
            userService.updateProfile(userId, body.get("name"));
            User updated = userService.getById(userId);
            updated.setPassword(null);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(HttpServletRequest request, @RequestBody DeleteUserRequest req) {
        Long userId = getUserIdFromToken(request);

        try {
            userService.deleteUserWithPassword(userId, req.getPassword());
            return ResponseEntity.ok(Map.of("message", "Kullanıcı silindi."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {
        try {
            userService.forgotPassword(body.get("email"));
            return ResponseEntity.ok(Map.of("message", "Şifre sıfırlama linki mail adresinize gönderildi."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {
        try {
            userService.resetPassword(body.get("token"), body.get("newPassword"));
            return ResponseEntity.ok(Map.of("message", "Şifreniz başarıyla sıfırlandı. Yeni şifrenizle giriş yapabilirsiniz."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
