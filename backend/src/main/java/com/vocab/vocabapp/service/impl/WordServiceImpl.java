package com.vocab.vocabapp.service.impl;

import com.vocab.vocabapp.entity.Word;
import com.vocab.vocabapp.repository.WordRepository;
import com.vocab.vocabapp.service.WordService;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.data.domain.PageRequest;

@Service
public class WordServiceImpl implements WordService {

    private final WordRepository wordRepository;

    public WordServiceImpl(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    @Override
    public List<Word> getAllWords(Integer limit) {
        if (limit != null && limit > 0) {
            return wordRepository
                    .findAll(PageRequest.of(0, limit))
                    .getContent();
        }
        return wordRepository.findAll();
    }

    @Override
    public List<Word> getAllWords() {
        return getAllWords(null);
    }

    @Override
    public Word saveWord(Word word) {
        return wordRepository.save(word);
    }
}
