package com.example.sns_project.dto;

import com.example.sns_project.enums.CommentEnum;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
public class CommentDto {
    private Long commentId;
    private Long boardId;
    private String content;

    private LocalDateTime createAt;

    private CommentEnum state;
}
