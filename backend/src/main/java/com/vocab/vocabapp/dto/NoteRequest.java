package com.vocab.vocabapp.dto;

import lombok.Data;

@Data
public class NoteRequest {
    private Long userId;
    private Long wordId;
    private String text;
}
