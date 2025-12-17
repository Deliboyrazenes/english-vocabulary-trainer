package com.vocab.vocabapp.service.impl;

import com.vocab.vocabapp.repository.UserRepository;
import com.vocab.vocabapp.service.AiLimitService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiLimitServiceImpl implements AiLimitService {

    private static final int GLOBAL_DAILY_LIMIT = 14000;

    private static final int MIN_LIMIT = 5;
    private static final int MAX_LIMIT = 100;

    private final UserRepository userRepository;

    @Override
    public int getPerUserDailyLimit() {
        long userCount = userRepository.count();
        if (userCount <= 0) {
            return MAX_LIMIT;
        }

        int calculated = (int) (GLOBAL_DAILY_LIMIT / userCount);

        if (calculated < MIN_LIMIT) {
            return MIN_LIMIT;
        }
        if (calculated > MAX_LIMIT) {
            return MAX_LIMIT;
        }
        return calculated;
    }
}
