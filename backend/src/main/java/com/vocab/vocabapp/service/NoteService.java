package com.vocab.vocabapp.service;

import com.vocab.vocabapp.entity.Note;

import java.util.List;

public interface NoteService {
    Note saveOrUpdate(Long userId, Long wordId, String text);
    Note getNote(Long userId, Long wordId);
    void deleteNote(Long userId, Long wordId);
    List<Note> getNotesByUser(Long userId);
}
