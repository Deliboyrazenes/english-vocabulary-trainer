package com.vocab.vocabapp.controller;

import com.vocab.vocabapp.dto.NoteRequest;
import com.vocab.vocabapp.entity.Note;
import com.vocab.vocabapp.service.NoteService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @PostMapping("/save")
    public Note saveOrUpdate(@RequestBody NoteRequest req) {
        return noteService.saveOrUpdate(req.getUserId(), req.getWordId(), req.getText());
    }

    @GetMapping
    public Note getNote(@RequestParam Long userId, @RequestParam Long wordId) {
        return noteService.getNote(userId, wordId);
    }

    @DeleteMapping
    public String delete(@RequestParam Long userId, @RequestParam Long wordId) {
        noteService.deleteNote(userId, wordId);
        return "Not silindi";
    }

    @GetMapping("/by-user")
    public List<Note> getNotesByUser(@RequestParam Long userId) {
        return noteService.getNotesByUser(userId);
    }

}
