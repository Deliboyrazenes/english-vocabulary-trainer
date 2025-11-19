package com.vocab.vocabapp.service.impl;

import com.vocab.vocabapp.entity.User;
import com.vocab.vocabapp.repository.KnownWordRepository;
import com.vocab.vocabapp.repository.UserRepository;
import com.vocab.vocabapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final KnownWordRepository knownWordRepository;


    public UserServiceImpl(UserRepository userRepository,
                           BCryptPasswordEncoder passwordEncoder,
                           KnownWordRepository knownWordRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.knownWordRepository = knownWordRepository;
    }

    // REGISTER — Şifre encode edilir
    @Override
    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // LOGIN — BCrypt matches()
    @Override
    public Optional<User> login(String email, String rawPassword) {
        return userRepository.findByEmail(email)
                .filter(u -> passwordEncoder.matches(rawPassword, u.getPassword()));
    }

    // CHANGE PASSWORD
    @Override
    public void changePassword(Long userId, String oldPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Eski şifre yanlış");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    // UPDATE PROFILE (avatar yok — sadece isim değişiyor)
    @Override
    public void updateProfile(Long userId, String name) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        user.setName(name);
        userRepository.save(user);
    }

    // GET USER BY ID
    @Override
    public User getById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public void deleteUserWithPassword(Long userId, String password) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));


        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Şifre hatalı!");
        }

        // Önce kullanıcının bilinen kelimelerini sil
        knownWordRepository.deleteByUserId(userId);

        // Sonra kullanıcıyı sil
        userRepository.delete(user);
    }
}

