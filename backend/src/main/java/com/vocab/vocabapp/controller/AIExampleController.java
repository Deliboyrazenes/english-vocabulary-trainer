package com.vocab.vocabapp.controller;

import com.vocab.vocabapp.dto.AIExampleResponse;
import com.vocab.vocabapp.service.GroqService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AIExampleController {

    private static final Logger logger = LoggerFactory.getLogger(AIExampleController.class);
    private final GroqService groqService;

    @GetMapping("/example/{word}")
    public ResponseEntity<AIExampleResponse> generateExample(@PathVariable String word) {
        try {
            logger.info("Generating AI example for word: {}", word);
            AIExampleResponse response = groqService.generateExampleSentence(word);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            if ("AI_LIMIT_REACHED".equals(e.getMessage())) {
                return ResponseEntity.status(429).body(
                        AIExampleResponse.builder()
                                .english("Daily AI limit reached")
                                .turkish("Günlük AI kullanım limitine ulaştınız")
                                .context("Limit")
                                .remainingToday(0)
                                .build()
                );
            }
            throw e;
        }

    }
}
