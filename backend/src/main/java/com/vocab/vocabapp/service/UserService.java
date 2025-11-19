package com.vocab.vocabapp.service;

import com.vocab.vocabapp.entity.User;
import java.util.Optional;

public interface UserService {
    User register(User user);
    Optional<User> login(String email, String password);
    void changePassword(Long userId, String oldPassword, String newPassword);
    void updateProfile(Long userId, String name);
    User getById(Long id);
    void deleteUserWithPassword(Long userId, String password);


}
