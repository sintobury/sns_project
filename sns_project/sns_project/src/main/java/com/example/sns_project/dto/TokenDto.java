package com.example.sns_project.dto;

import lombok.Data;

@Data
public class TokenDto {
    private String accessToken;
    private String refreshToken;
    private Long userTableId;

    public TokenDto(String accessToken, String refreshToken, Long userTableId) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.userTableId = userTableId;
    }
}
