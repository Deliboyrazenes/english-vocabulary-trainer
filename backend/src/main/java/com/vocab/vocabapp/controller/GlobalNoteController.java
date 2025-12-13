package com.vocab.vocabapp.controller;

import com.vocab.vocabapp.dto.GlobalNoteRequest;
import com.vocab.vocabapp.dto.GlobalNoteResponse;
import com.vocab.vocabapp.security.JwtService;
import com.vocab.vocabapp.service.GlobalNoteService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes/global")
@RequiredArgsConstructor
public class GlobalNoteController {

    private final GlobalNoteService globalNoteService;
    private final JwtService jwtService;

    @GetMapping
    public ResponseEntity<List<GlobalNoteResponse>> getAll(HttpServletRequest request) {
        Long userId = extractUserId(request);
        return ResponseEntity.ok(globalNoteService.getUserNotes(userId));
    }

    @PostMapping
    public ResponseEntity<GlobalNoteResponse> create(
            @RequestBody GlobalNoteRequest request,
            HttpServletRequest httpRequest
    ) {
        Long userId = extractUserId(httpRequest);
        return ResponseEntity.ok(globalNoteService.create(request, userId));
    }

    @PutMapping
    public ResponseEntity<GlobalNoteResponse> update(
            @RequestBody GlobalNoteRequest request,
            HttpServletRequest httpRequest
    ) {
        Long userId = extractUserId(httpRequest);
        return ResponseEntity.ok(globalNoteService.update(request, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            HttpServletRequest httpRequest
    ) {
        Long userId = extractUserId(httpRequest);
        globalNoteService.delete(id, userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/pin")
    public ResponseEntity<GlobalNoteResponse> togglePin(
            @PathVariable Long id,
            HttpServletRequest httpRequest
    ) {
        Long userId = extractUserId(httpRequest);
        return ResponseEntity.ok(globalNoteService.togglePin(id, userId));
    }

    private Long extractUserId(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Authorization header missing");
        }

        String token = authHeader.substring(7);
        return jwtService.extractUserId(token);
    }
}
