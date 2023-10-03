package com.example.sns_project.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
public class JoinDto {
    private String username;
    private String password;
    private String name;
    private String gender;
    private String email;
    private LocalDateTime birth;
}
