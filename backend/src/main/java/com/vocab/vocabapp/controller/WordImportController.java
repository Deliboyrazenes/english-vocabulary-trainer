package com.vocab.vocabapp.controller;

import com.vocab.vocabapp.entity.Word;
import com.vocab.vocabapp.repository.WordRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/import")
public class WordImportController {

    private final WordRepository wordRepository;

    public WordImportController(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    @PostMapping("/words")
    public String importWords(@RequestBody List<Word> words) {
        wordRepository.saveAll(words);
        return "✅ " + words.size() + " kelime başarıyla eklendi!";
    }
}
