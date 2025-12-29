package com.vocab.vocabapp.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.vocab.vocabapp.service.EmailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    private static final String FROM_EMAIL = "delipoyrazenes@gmail.com";

    @Override
    public void sendVerificationEmail(String to, String name, String code) {
        try {
            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("code", code);

            String process = templateEngine.process("verification-email", context);

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom(FROM_EMAIL, "VocabZone Destek");
            helper.setTo(to);
            helper.setSubject("VocabZone - Hesabını Doğrula");
            helper.setText(process, true);

            mailSender.send(mimeMessage);
            log.info("Doğrulama maili başarıyla gönderildi: {}", to);
        } catch (Exception e) {
            log.error("❌ DOĞRULAMA MAİLİ GÖNDERİLEMEDİ! (Muhtemelen SMTP ayarları eksik). Hata: {}", e.getMessage());
        }
    }

    @Override
    public void sendPasswordResetEmail(String to, String name, String resetLink) {
        try {
            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("resetLink", resetLink);

            String process = templateEngine.process("reset-password-email", context);

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom(FROM_EMAIL, "VocabZone Güvenlik");
            helper.setTo(to);
            helper.setSubject("VocabZone - Şifre Sıfırlama");
            helper.setText(process, true);

            mailSender.send(mimeMessage);
            log.info("Şifre sıfırlama maili başarıyla gönderildi: {}", to);
        } catch (Exception e) {
            log.error("❌ ŞİFRE SIFIRLAMA MAİLİ GÖNDERİLEMEDİ! Hata: {}", e.getMessage());
        }
    }
}
