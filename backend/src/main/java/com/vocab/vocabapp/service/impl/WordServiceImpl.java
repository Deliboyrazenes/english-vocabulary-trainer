package com.vocab.vocabapp.service.impl;

import com.vocab.vocabapp.entity.Word;
import com.vocab.vocabapp.repository.WordRepository;
import com.vocab.vocabapp.service.WordService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class WordServiceImpl implements WordService {

    private final WordRepository wordRepository;

    public WordServiceImpl(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    @Override
    public List<Word> getAllWords() {
        return wordRepository.findAll();
    }

    @Override
    public Word saveWord(Word word) {
        return wordRepository.save(word);
    }
}
