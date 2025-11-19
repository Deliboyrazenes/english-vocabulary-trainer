package com.vocab.vocabapp.service.impl;

import com.vocab.vocabapp.entity.KnownWord;
import com.vocab.vocabapp.entity.User;
import com.vocab.vocabapp.entity.Word;
import com.vocab.vocabapp.repository.KnownWordRepository;
import com.vocab.vocabapp.repository.UserRepository;
import com.vocab.vocabapp.repository.WordRepository;
import com.vocab.vocabapp.service.KnownWordService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class KnownWordServiceImpl implements KnownWordService {

    private final KnownWordRepository knownWordRepository;
    private final UserRepository userRepository;
    private final WordRepository wordRepository;

    public KnownWordServiceImpl(KnownWordRepository knownWordRepository,
                                UserRepository userRepository,
                                WordRepository wordRepository) {
        this.knownWordRepository = knownWordRepository;
        this.userRepository = userRepository;
        this.wordRepository = wordRepository;

    }

    @Override
    @Transactional
    public KnownWord markKnown(Long userId, Long wordId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));
        Word word = wordRepository.findById(wordId)
                .orElseThrow(() -> new IllegalArgumentException("Word not found: " + wordId));

        if (knownWordRepository.existsByUserIdAndWordId(userId, wordId)) {
            return knownWordRepository.findByUserAndWord(user, word)
                    .orElseThrow();
        }

        KnownWord entity = KnownWord.builder()
                .user(user)
                .word(word)
                .knownAt(LocalDate.now())
                .build();

        return knownWordRepository.save(entity);
    }

    @Override
    @Transactional
    public void unmarkKnown(Long userId, Long wordId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));
        Word word = wordRepository.findById(wordId)
                .orElseThrow(() -> new IllegalArgumentException("Word not found: " + wordId));

        knownWordRepository.findByUserAndWord(user, word)
                .ifPresent(knownWordRepository::delete);
    }

    @Override
    public List<KnownWord> listKnownByUser(Long userId) {
        return knownWordRepository.findByUserId(userId);
    }



    @Override
    public Map<String, Object> getStats(Long userId) {

        Map<String, Object> result = new HashMap<>();

        /* ================= TOTAL & KNOWN ================= */
        long totalWords = wordRepository.count();
        long knownWords = knownWordRepository.countByUserId(userId);

        result.put("total", totalWords);
        result.put("known", knownWords);

        /* ================= LEVEL COUNTS ================= */
        Map<String, Long> levels = new HashMap<>();
        knownWordRepository.countKnownByLevel(userId).forEach(row -> {
            String level = (String) row[0];
            Long count = ((Number) row[1]).longValue();
            levels.put(level, count);
        });
        result.put("levels", levels);

        /* ================= TYPE COUNTS ================= */
        Map<String, Long> types = new HashMap<>();
        knownWordRepository.countKnownByType(userId).forEach(row -> {
            String type = (String) row[0];
            Long count = ((Number) row[1]).longValue();
            types.put(type, count);
        });
        result.put("types", types);

        /* ================= WEEKLY (Mon → Sun) ================= */
        Map<String, Long> weekly = new LinkedHashMap<>();

        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(6); // Son 7 gün

        // 7 günü otomatik baştan ekle
        for (int i = 0; i < 7; i++) {
            LocalDate d = start.plusDays(i);
            String dayName = d.getDayOfWeek().name(); // MONDAY
            weekly.put(dayName, 0L);
        }

        // Veritabanı kayıtları → günlere dağıt
        knownWordRepository.weeklyActivity(userId, start, end)
                .forEach(row -> {
                    LocalDate date = (LocalDate) row[0];
                    Long count = ((Number) row[1]).longValue();
                    String dayName = date.getDayOfWeek().name();
                    weekly.put(dayName, count);
                });

        result.put("weeklyActivity", weekly);

        /* ================= TODAY COUNT ================= */
        long todayCount = knownWordRepository.countByUserIdAndKnownAt(userId, LocalDate.now());
        result.put("today", todayCount);

        /* ================= LAST 7 DAYS TOTAL ================= */
        long last7 = knownWordRepository.countByUserIdAndKnownAtBetween(
                userId,
                LocalDate.now().minusDays(6),
                LocalDate.now()
        );
        result.put("last7", last7);

        /* ================= LAST 30 DAYS TOTAL ================= */
        long last30 = knownWordRepository.countByUserIdAndKnownAtBetween(
                userId,
                LocalDate.now().minusDays(29),
                LocalDate.now()
        );
        result.put("last30", last30);

        return result;
    }


}
