package com.vocab.vocabapp.service;

import com.vocab.vocabapp.entity.KnownWord;

import java.util.List;
import java.util.Map;

public interface KnownWordService {
    KnownWord markKnown(Long userId, Long wordId);
    void unmarkKnown(Long userId, Long wordId);
    List<KnownWord> listKnownByUser(Long userId);
    Map<String, Object> getStats(Long userId);

}
