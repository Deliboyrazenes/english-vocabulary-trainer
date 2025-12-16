package com.vocab.vocabapp.repository;

import com.vocab.vocabapp.entity.DailyAiUsage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DailyAiUsageRepository
        extends JpaRepository<DailyAiUsage, Long> {
}
