package com.vocab.vocabapp.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GlobalNoteResponse {

    private Long id;
    private String title;
    private String content;
    private String category;
    private String color;
    private String icon;
    private Boolean pinned;
}
