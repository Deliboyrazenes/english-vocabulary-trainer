package com.vocab.vocabapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vocab.vocabapp.dto.NoteRequest;
import com.vocab.vocabapp.entity.Note;
import com.vocab.vocabapp.security.JwtService;
import com.vocab.vocabapp.service.NoteService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;
    private final JwtService jwtService;

    private Long getUserId(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            return null;
        }

        return jwtService.extractUserId(header.substring(7));
    }

    @PostMapping("/save")
    public Note saveOrUpdate(HttpServletRequest request, @RequestBody NoteRequest req) {
        Long userId = getUserId(request);
        return noteService.saveOrUpdate(userId, req.getWordId(), req.getText());
    }

    @GetMapping
    public Note getNote(HttpServletRequest request, @RequestParam Long wordId) {
        Long userId = getUserId(request);
        return noteService.getNote(userId, wordId);
    }

    @DeleteMapping
    public String delete(HttpServletRequest request, @RequestParam Long wordId) {
        Long userId = getUserId(request);
        noteService.deleteNote(userId, wordId);
        return "Not silindi";
    }

    @GetMapping("/by-user")
    public List<Note> getNotesByUser(HttpServletRequest request) {
        Long userId = getUserId(request);
        return noteService.getNotesByUser(userId);
    }
}
