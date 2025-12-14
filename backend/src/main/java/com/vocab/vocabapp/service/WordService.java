package com.vocab.vocabapp.service;

import com.vocab.vocabapp.entity.Word;
import java.util.List;

public interface WordService {

    List<Word> getAllWords(Integer limit);

    List<Word> getAllWords();

    Word saveWord(Word word);

}
