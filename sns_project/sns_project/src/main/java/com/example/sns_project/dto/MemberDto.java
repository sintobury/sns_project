package com.example.sns_project.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
public class MemberDto {
    private Long Id;

    private String username;

    private String name;

    private String email;

    private LocalDateTime createAt;

    private String provider;

    private String gender;

    private LocalDateTime birth;

    public MemberDto(Long id, String username, String name, String email, LocalDateTime createAt, String provider, String gender, LocalDateTime birth) {
        this.Id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.createAt = createAt;
        this.provider = provider;
        this.gender = gender;
        this.birth = birth;
    }
}
