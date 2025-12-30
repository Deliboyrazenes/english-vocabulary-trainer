package com.vocab.vocabapp.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.vocab.vocabapp.entity.User;
import com.vocab.vocabapp.repository.UserRepository;
import com.vocab.vocabapp.service.EmailService;
import com.vocab.vocabapp.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @org.springframework.beans.factory.annotation.Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    @Override
    public User register(User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Bu email zaten kayıtlı!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // OTP Mantığı
        String otp = generateOtp();
        user.setVerificationCode(otp);
        user.setCodeExpiration(LocalDateTime.now().plusMinutes(5));
        user.setIsEnabled(false);

        User savedUser = userRepository.save(user);
        
        // Mail Gönder
        emailService.sendVerificationEmail(savedUser.getEmail(), savedUser.getName(), otp);

        return savedUser;
    }

    @Override
    public Optional<User> login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            if (user.getIsEnabled() == null || !user.getIsEnabled()) {
                throw new RuntimeException("Lütfen önce hesabınızı doğrulayın.");
            }

            if (passwordEncoder.matches(password, user.getPassword())) {
                return Optional.of(user);
            }
        }

        return Optional.empty();
    }

    @Override
    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        String token = UUID.randomUUID().toString();
        user.setPasswordResetToken(token);
        user.setPasswordResetTokenExpiration(LocalDateTime.now().plusMinutes(15));
        userRepository.save(user);

        String resetLink = frontendUrl + "?token=" + token;
        
        emailService.sendPasswordResetEmail(user.getEmail(), user.getName(), resetLink);
    }

    @Override
    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByPasswordResetToken(token)
                .orElseThrow(() -> new RuntimeException("Geçersiz veya süresi dolmuş token!"));

        if (user.getPasswordResetTokenExpiration().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token süresi dolmuş!");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setPasswordResetToken(null);
        user.setPasswordResetTokenExpiration(null);
        userRepository.save(user);
    }

    @Override
    public void confirmVerification(String email, String code) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        if (user.getIsEnabled() != null && user.getIsEnabled()) {
            throw new RuntimeException("Hesap zaten doğrulanmış.");
        }

        if (user.getCodeExpiration().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Kodun süresi dolmuş. Lütfen yeni kod isteyin.");
        }

        if (!user.getVerificationCode().equals(code)) {
            throw new RuntimeException("Hatalı doğrulama kodu!");
        }

        user.setIsEnabled(true);
        user.setVerificationCode(null);
        user.setCodeExpiration(null);
        userRepository.save(user);
    }

    @Override
    public void resendVerificationCode(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        if (user.getIsEnabled() != null && user.getIsEnabled()) {
            throw new RuntimeException("Hesap zaten doğrulanmış.");
        }

        String otp = generateOtp();
        user.setVerificationCode(otp);
        user.setCodeExpiration(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);

        emailService.sendVerificationEmail(user.getEmail(), user.getName(), otp);
    }

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    @Override
    public void changePassword(Long userId, String oldPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Eski şifre hatalı!");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public void updateProfile(Long userId, String name) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        user.setName(name);
        userRepository.save(user);
    }

    @Override
    public User getById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
    }

    @Override
    public void deleteUserWithPassword(Long userId, String password) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Şifre hatalı!");
        }

        userRepository.delete(user);
    }
}
