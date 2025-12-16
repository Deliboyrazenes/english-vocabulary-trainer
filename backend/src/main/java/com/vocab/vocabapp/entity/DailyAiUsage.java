package com.vocab.vocabapp.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "daily_ai_usage")
public class DailyAiUsage {

    @Id
    private Long userId;

    @Column(nullable = false)
    private LocalDate usageDate;

    @Column(nullable = false)
    private int usedCount;

    public DailyAiUsage() {
    }

    public DailyAiUsage(Long userId, LocalDate usageDate, int usedCount) {
        this.userId = userId;
        this.usageDate = usageDate;
        this.usedCount = usedCount;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDate getUsageDate() {
        return usageDate;
    }

    public void setUsageDate(LocalDate usageDate) {
        this.usageDate = usageDate;
    }

    public int getUsedCount() {
        return usedCount;
    }

    public void setUsedCount(int usedCount) {
        this.usedCount = usedCount;
    }
}
