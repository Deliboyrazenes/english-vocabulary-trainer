package com.vocab.vocabapp.dto;

import lombok.Data;

@Data
public class DeleteUserRequest {
    private Long userId;
    private String password;
}
