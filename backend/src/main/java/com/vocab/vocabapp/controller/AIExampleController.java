package com.vocab.vocabapp.controller;

import com.vocab.vocabapp.dto.AIExampleResponse;
import com.vocab.vocabapp.service.GroqService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.vocab.vocabapp.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AIExampleController {

    private final GroqService groqService;
    private final JwtService jwtService;

    @GetMapping("/example/{word}")
    public ResponseEntity<AIExampleResponse> generateExample(
            HttpServletRequest request,
            @PathVariable String word
    ) {

        String header = request.getHeader("Authorization");
        Long userId = jwtService.extractUserId(header.substring(7));

        AIExampleResponse response
                = groqService.generateExampleSentence(word, userId);

        return ResponseEntity.ok(response);
    }
}
