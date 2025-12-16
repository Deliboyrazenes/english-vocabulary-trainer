package com.vocab.vocabapp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIExampleResponse {

    private String english;
    private String turkish;
    private String context;
    private int remainingToday;

}
