package com.vocab.vocabapp.controller;

import com.vocab.vocabapp.entity.Word;
import com.vocab.vocabapp.service.WordService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;

@RestController
@RequestMapping("/words")
public class WordController {

    private final WordService wordService;

    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping
    public List<Word> getAllWords(@RequestParam(required = false) Integer limit) {
        return wordService.getAllWords(limit);
    }

    // 2️⃣ Yeni kelime ekle
    @PostMapping
    public Word saveWord(@RequestBody Word word) {
        return wordService.saveWord(word);
    }
}
