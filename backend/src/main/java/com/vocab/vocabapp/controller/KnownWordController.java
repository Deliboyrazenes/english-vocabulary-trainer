package com.vocab.vocabapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vocab.vocabapp.dto.KnownWordRequest;
import com.vocab.vocabapp.entity.KnownWord;
import com.vocab.vocabapp.security.JwtService;
import com.vocab.vocabapp.service.KnownWordService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/known-words")
public class KnownWordController {

    private final KnownWordService knownWordService;
    private final JwtService jwtService;

    public KnownWordController(KnownWordService knownWordService, JwtService jwtService) {
        this.knownWordService = knownWordService;
        this.jwtService = jwtService;
    }

    private Long getUserIdFromToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            return null;
        }

        String token = header.substring(7);
        return jwtService.extractUserId(token);
    }

    @GetMapping
    public List<Map<String, Object>> list(HttpServletRequest request) {
        Long userId = getUserIdFromToken(request);
        return knownWordService.listKnownByUser(userId).stream()
                .map(k -> Map.of(
                "id", k.getId(),
                "word", Map.of(
                        "id", k.getWord().getId(),
                        "en", k.getWord().getEn(),
                        "tr", k.getWord().getTr(),
                        "type", k.getWord().getType(),
                        "level", k.getWord().getLevel()
                )
        ))
                .toList();
    }

    @PostMapping
    public KnownWord mark(HttpServletRequest request, @RequestBody KnownWordRequest req) {
        Long userId = getUserIdFromToken(request);
        return knownWordService.markKnown(userId, req.getWordId());
    }

    @DeleteMapping
    public void unmark(HttpServletRequest request, @RequestParam Long wordId) {
        Long userId = getUserIdFromToken(request);
        knownWordService.unmarkKnown(userId, wordId);
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats(HttpServletRequest request) {
        Long userId = getUserIdFromToken(request);
        return ResponseEntity.ok(knownWordService.getStats(userId));
    }
}
