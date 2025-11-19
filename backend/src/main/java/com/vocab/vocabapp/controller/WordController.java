package com.vocab.vocabapp.controller;

import com.vocab.vocabapp.entity.Word;
import com.vocab.vocabapp.service.WordService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/words")
public class WordController {

    private final WordService wordService;

    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    // 1️⃣ Tüm kelimeleri getir
    @GetMapping
    public List<Word> getAllWords() {
        return wordService.getAllWords();
    }

    // 2️⃣ Yeni kelime ekle
    @PostMapping
    public Word saveWord(@RequestBody Word word) {
        return wordService.saveWord(word);
    }
}
