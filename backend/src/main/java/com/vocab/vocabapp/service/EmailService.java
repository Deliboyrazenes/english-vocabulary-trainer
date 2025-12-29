package com.vocab.vocabapp.service;

public interface EmailService {
    void sendVerificationEmail(String to, String name, String code);
    void sendPasswordResetEmail(String to, String name, String token);
}
