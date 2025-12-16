package com.vocab.vocabapp.service;

import com.vocab.vocabapp.dto.AIExampleResponse;

public interface GroqService {

    AIExampleResponse generateExampleSentence(String word);
}
