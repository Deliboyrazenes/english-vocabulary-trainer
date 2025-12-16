package com.vocab.vocabapp.service.impl;

import com.vocab.vocabapp.entity.DailyAiUsage;
import com.vocab.vocabapp.repository.DailyAiUsageRepository;
import com.vocab.vocabapp.service.AiLimitService;
import com.vocab.vocabapp.service.AiUsageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AiUsageServiceImpl implements AiUsageService {

    private final DailyAiUsageRepository repository;
    private final AiLimitService aiLimitService;

    @Override
    public int useOneAndGetRemaining(Long userId) {

        LocalDate today = LocalDate.now();
        int dailyLimit = aiLimitService.getPerUserDailyLimit();

        DailyAiUsage usage = repository.findById(userId)
                .orElseGet(() -> new DailyAiUsage(userId, today, 0));

        // Gün değişmişse reset
        if (!usage.getUsageDate().equals(today)) {
            usage.setUsageDate(today);
            usage.setUsedCount(0);
        }

        // Limit kontrol
        if (usage.getUsedCount() >= dailyLimit) {
            throw new RuntimeException("AI_LIMIT_REACHED");
        }

        // 1 hak düş
        usage.setUsedCount(usage.getUsedCount() + 1);
        repository.save(usage);

        return dailyLimit - usage.getUsedCount();
    }
}
