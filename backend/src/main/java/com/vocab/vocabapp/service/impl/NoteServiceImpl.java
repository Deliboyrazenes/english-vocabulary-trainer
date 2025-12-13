package com.vocab.vocabapp.service.impl;

import com.vocab.vocabapp.entity.Note;
import com.vocab.vocabapp.entity.User;
import com.vocab.vocabapp.entity.Word;
import com.vocab.vocabapp.repository.NoteRepository;
import com.vocab.vocabapp.repository.UserRepository;
import com.vocab.vocabapp.repository.WordRepository;
import com.vocab.vocabapp.service.NoteService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final WordRepository wordRepository;

    @Override
    @Transactional
    public Note saveOrUpdate(Long userId, Long wordId, String text) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        Word word = wordRepository.findById(wordId)
                .orElseThrow(() -> new RuntimeException("Kelime bulunamadı"));

        Note note = noteRepository.findByUserIdAndWordId(userId, wordId)
                .orElse(new Note());

        note.setUser(user);
        note.setWord(word);
        note.setText(text);
        note.setUpdatedAt(LocalDateTime.now());

        if (note.getCreatedAt() == null) {
            note.setCreatedAt(LocalDateTime.now());
        }

        return noteRepository.save(note);
    }

    @Override
    public Note getNote(Long userId, Long wordId) {
        return noteRepository.findByUserIdAndWordId(userId, wordId).orElse(null);
    }

    @Override
    @Transactional
    public void deleteNote(Long userId, Long wordId) {
        Note note = noteRepository.findByUserIdAndWordId(userId, wordId)
                .orElseThrow(() -> new RuntimeException("Not bulunamadı"));
        noteRepository.delete(note);
    }

    @Override
    public List<Note> getNotesByUser(Long userId) {
        return noteRepository.findAllByUserId(userId);
    }

}
