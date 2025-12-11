package com.vocab.vocabapp.dto;

import lombok.Data;

@Data
public class GlobalNoteRequest {

    private Long id;
    private String title;
    private String content;
    private String category;
    private String color;
    private String icon;
    private Boolean pinned;
}
