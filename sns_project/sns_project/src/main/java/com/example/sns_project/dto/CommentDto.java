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

    public CommentDto(Long commentId, String content, LocalDateTime createAt, CommentEnum state) {
        this.commentId = commentId;
        this.content = content;
        this.createAt = createAt;
        this.state = state;
    }

    public CommentDto(Long commentId, Long boardId, String content, LocalDateTime createAt, CommentEnum state) {
        this.commentId = commentId;
        this.boardId = boardId;
        this.content = content;
        this.createAt = createAt;
        this.state = state;
    }
}
