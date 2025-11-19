package com.vocab.vocabapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KnownWordRequest {
    private Long userId;
    private Long wordId;
}
