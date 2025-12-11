package com.vocab.vocabapp.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vocab.vocabapp.dto.GlobalNoteRequest;
import com.vocab.vocabapp.dto.GlobalNoteResponse;
import com.vocab.vocabapp.repository.UserRepository;
import com.vocab.vocabapp.service.GlobalNoteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notes/global")
@RequiredArgsConstructor
public class GlobalNoteController {

    private final GlobalNoteService service;
    private final UserRepository userRepository;

    private Long getUserId(UserDetails user) {
        return userRepository.findByEmail(user.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    @GetMapping
    public List<GlobalNoteResponse> getAll(@AuthenticationPrincipal UserDetails user) {
        return service.getUserNotes(getUserId(user));
    }

    @PostMapping
    public GlobalNoteResponse create(
            @RequestBody GlobalNoteRequest req,
            @AuthenticationPrincipal UserDetails user
    ) {
        return service.create(req, getUserId(user));
    }

    @PutMapping
    public GlobalNoteResponse update(
            @RequestBody GlobalNoteRequest req,
            @AuthenticationPrincipal UserDetails user
    ) {
        return service.update(req, getUserId(user));
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails user
    ) {
        service.delete(id, getUserId(user));
    }

    @PostMapping("/{id}/pin")
    public GlobalNoteResponse togglePin(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails user
    ) {
        return service.togglePin(id, getUserId(user));
    }
}
