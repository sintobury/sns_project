package com.example.sns_project.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class LoginDto {
    private String username;
    private String password;
}
