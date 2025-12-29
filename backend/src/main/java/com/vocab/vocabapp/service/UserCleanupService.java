package com.vocab.vocabapp.service;

import com.vocab.vocabapp.entity.User;
import com.vocab.vocabapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserCleanupService {

    private final UserRepository userRepository;

    /**
     * Her saat başı çalışır ve 3 saatten eski, doğrulanmamış hesapları siler.
     * Uygulama açıldıktan 1 dakika sonra başlar (initialDelay = 60000).
     */
    @Scheduled(fixedRate = 3600000, initialDelay = 60000)
    @Transactional
    public void cleanupUnverifiedUsers() {
        LocalDateTime threshold = LocalDateTime.now().minusHours(3);
        
        log.info("Doğrulanmamış hesaplar için temizlik işlemi başlatıldı. Eşik zamanı: {}", threshold);
        
        List<User> staleUsers = userRepository.findByIsEnabledFalseAndCreatedDateBefore(threshold);
        
        if (!staleUsers.isEmpty()) {
            log.info("{} adet doğrulanmamış çöp hesap bulundu. Siliniyor...", staleUsers.size());
            userRepository.deleteAll(staleUsers);
            log.info("Temizlik işlemi başarıyla tamamlandı.");
        } else {
            log.info("Temizlenecek doğrulanmamış hesap bulunamadı.");
        }
    }
}
