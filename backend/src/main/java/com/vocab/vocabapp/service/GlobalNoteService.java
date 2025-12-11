package com.vocab.vocabapp.service;

import java.util.List;

import com.vocab.vocabapp.dto.GlobalNoteRequest;
import com.vocab.vocabapp.dto.GlobalNoteResponse;

public interface GlobalNoteService {

    List<GlobalNoteResponse> getUserNotes(Long userId);

    GlobalNoteResponse create(GlobalNoteRequest request, Long userId);

    GlobalNoteResponse update(GlobalNoteRequest request, Long userId);

    void delete(Long id, Long userId);

    GlobalNoteResponse togglePin(Long id, Long userId);
}
