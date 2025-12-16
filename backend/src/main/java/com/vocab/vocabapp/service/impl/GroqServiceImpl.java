package com.vocab.vocabapp.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vocab.vocabapp.dto.AIExampleResponse;
import com.vocab.vocabapp.repository.UserRepository;
import com.vocab.vocabapp.service.AiUsageService;
import com.vocab.vocabapp.service.GroqService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GroqServiceImpl implements GroqService {

    private static final Logger logger = LoggerFactory.getLogger(GroqServiceImpl.class);

    @Value("${groq.api.key:}")
    private String apiKey;

    private static final String GROQ_API_URL
            = "https://api.groq.com/openai/v1/chat/completions";

    private final AiUsageService aiUsageService;
    private final UserRepository userRepository;

    @Override
    public AIExampleResponse generateExampleSentence(String word) {

        if (apiKey == null || apiKey.isEmpty()) {
            logger.warn("Groq API key not configured");
            return buildError("API key not configured", "API anahtarı yapılandırılmamış");
        }

        /* ================= USER & LIMIT ================= */
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        Long userId = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("USER_NOT_FOUND"))
                .getId();

        // 🔥 günlük limitten 1 düş, kalan hakkı al
        int remainingToday = aiUsageService.useOneAndGetRemaining(userId);

        /* ================= AI REQUEST ================= */
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper mapper = new ObjectMapper();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        String prompt = """
Generate ONE short and natural English sentence using the word '%s'.

STRICT RULES:
- Sentence length MUST be 6–12 words.
- Avoid common or obvious ideas.
- Do NOT use business, company, or work-related examples.
- Choose a different real-life situation than usual.
- Keep it simple and conversational.

Then translate the sentence into Turkish.

- Turkish translation MUST be pure Turkish.
- Do NOT include any foreign words or accents (Spanish, Vietnamese, etc).
- Use standard daily Turkish only.

Respond ONLY in this format:

ENGLISH: [sentence]
TURKISH: [translation]
CONTEXT: [idea in 2–3 words]
""".formatted(word);

        Map<String, Object> requestBody = Map.of(
                "model", "llama-3.3-70b-versatile",
                "messages", List.of(
                        Map.of("role", "user", "content", prompt)
                ),
                "temperature", 0.9,
                "max_tokens", 160
        );

        HttpEntity<Map<String, Object>> request
                = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    GROQ_API_URL,
                    HttpMethod.POST,
                    request,
                    String.class
            );

            Map<String, Object> responseMap
                    = mapper.readValue(response.getBody(), Map.class);

            List<Map<String, Object>> choices
                    = (List<Map<String, Object>>) responseMap.get("choices");

            if (choices == null || choices.isEmpty()) {
                logger.warn("Groq returned empty choices");
                return buildFallback(word, remainingToday);
            }

            Map<String, Object> message
                    = (Map<String, Object>) choices.get(0).get("message");

            String content = (String) message.get("content");

            logger.info("AI example generated for word: {}", word);
            return parseResponse(content, word, remainingToday);

        } catch (RestClientException e) {
            logger.error("Groq REST error: {}", e.getMessage());
            return buildFallback(word, remainingToday);
        } catch (JsonProcessingException | ClassCastException e) {
            logger.error("Groq parse error: {}", e.getMessage());
            return buildFallback(word, remainingToday);
        }
    }

    /* ================= HELPERS ================= */
    private AIExampleResponse parseResponse(
            String content,
            String word,
            int remainingToday
    ) {

        String english = "";
        String turkish = "";
        String context = "General Usage";

        for (String line : content.split("\n")) {
            line = line.trim();
            if (line.startsWith("ENGLISH:")) {
                english = line.substring("ENGLISH:".length()).trim();
            } else if (line.startsWith("TURKISH:")) {
                turkish = cleanTurkish(
                        line.substring("TURKISH:".length()).trim());
            } else if (line.startsWith("CONTEXT:")) {
                context = line.substring("CONTEXT:".length()).trim();
            }
        }

        if (english.isEmpty() || turkish.isEmpty()) {
            return buildFallback(word, remainingToday);
        }

        return AIExampleResponse.builder()
                .english(english)
                .turkish(turkish)
                .context(context)
                .remainingToday(remainingToday)
                .build();
    }

    private String cleanTurkish(String text) {
        if (text == null) {
            return "";
        }

        return text
                .replaceAll("[^a-zA-ZçÇğĞıİöÖşŞüÜ\\s.,!?]", "")
                .replaceAll("\\s+", " ")
                .trim();
    }

    private AIExampleResponse buildFallback(String word, int remainingToday) {
        return AIExampleResponse.builder()
                .english("I often use " + word.toLowerCase() + " in my daily life.")
                .turkish("Günlük hayatımda " + word + " kelimesini sıkça kullanırım.")
                .context("Daily Life")
                .remainingToday(remainingToday)
                .build();
    }

    private AIExampleResponse buildError(String en, String tr) {
        return AIExampleResponse.builder()
                .english(en)
                .turkish(tr)
                .context("Error")
                .remainingToday(0)
                .build();
    }
}
