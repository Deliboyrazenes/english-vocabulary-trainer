package com.vocab.vocabapp.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vocab.vocabapp.dto.GlobalNoteRequest;
import com.vocab.vocabapp.dto.GlobalNoteResponse;
import com.vocab.vocabapp.entity.GlobalNote;
import com.vocab.vocabapp.repository.GlobalNoteRepository;
import com.vocab.vocabapp.service.GlobalNoteService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GlobalNoteServiceImpl implements GlobalNoteService {

    private final GlobalNoteRepository repo;

    @Override
    public List<GlobalNoteResponse> getUserNotes(Long userId) {
        return repo.findByUserIdOrderByPinnedDesc(userId)
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public GlobalNoteResponse create(GlobalNoteRequest req, Long userId) {
        GlobalNote note = GlobalNote.builder()
                .userId(userId)
                .title(req.getTitle())
                .content(req.getContent())
                .category(req.getCategory())
                .color(req.getColor())
                .icon(req.getIcon())
                .pinned(false)
                .build();

        repo.save(note);
        return toDto(note);
    }

    @Override
    public GlobalNoteResponse update(GlobalNoteRequest req, Long userId) {
        GlobalNote note = repo.findById(req.getId())
                .orElseThrow(() -> new RuntimeException("Note not found"));

        if (!note.getUserId().equals(userId)) {
            throw new RuntimeException("Forbidden");
        }

        note.setTitle(req.getTitle());
        note.setContent(req.getContent());
        note.setCategory(req.getCategory());
        note.setColor(req.getColor());
        note.setIcon(req.getIcon());

        repo.save(note);
        return toDto(note);
    }

    @Override
    public void delete(Long id, Long userId) {
        GlobalNote note = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        if (!note.getUserId().equals(userId)) {
            throw new RuntimeException("Forbidden");
        }

        repo.delete(note);
    }

    @Override
    public GlobalNoteResponse togglePin(Long id, Long userId) {
        GlobalNote note = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        if (!note.getUserId().equals(userId)) {
            throw new RuntimeException("Forbidden");
        }

        note.setPinned(!note.getPinned());
        repo.save(note);

        return toDto(note);
    }

    private GlobalNoteResponse toDto(GlobalNote n) {
        return GlobalNoteResponse.builder()
                .id(n.getId())
                .title(n.getTitle())
                .content(n.getContent())
                .category(n.getCategory())
                .color(n.getColor())
                .icon(n.getIcon())
                .pinned(n.getPinned())
                .build();
    }
}
