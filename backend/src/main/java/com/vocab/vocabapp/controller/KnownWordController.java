package com.vocab.vocabapp.controller;

import com.vocab.vocabapp.dto.KnownWordRequest;
import com.vocab.vocabapp.entity.KnownWord;
import com.vocab.vocabapp.service.KnownWordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/known-words")
public class KnownWordController {

    private final KnownWordService knownWordService;

    public KnownWordController(KnownWordService knownWordService) {
        this.knownWordService = knownWordService;
    }

    @GetMapping
    public List<Map<String, Object>> list(@RequestParam Long userId) {
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
    public KnownWord mark(@RequestBody KnownWordRequest request) {
        return knownWordService.markKnown(request.getUserId(), request.getWordId());
    }

    @DeleteMapping
    public void unmark(@RequestParam Long userId, @RequestParam Long wordId) {
        knownWordService.unmarkKnown(userId, wordId);
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats(@RequestParam Long userId) {
        return ResponseEntity.ok(knownWordService.getStats(userId));
    }

}
