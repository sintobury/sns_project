package com.example.sns_project.dto;

import com.example.sns_project.entity.Member;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class BoardDto {
    private Long id;

    private String title;

    private String content;

    private LocalDateTime createAt;

    private String hashTag;
    private List<MultipartFile> files;
    private List<UrlResource> boardFiles;

    public BoardDto(Long id, String title, String content, LocalDateTime createAt, String hashTag, List<UrlResource> boardFiles) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createAt = createAt;
        this.hashTag = hashTag;
        this.boardFiles = boardFiles;
    }

    public BoardDto(String title, String content, LocalDateTime createAt, String hashTag, List<MultipartFile> files) {
        this.title = title;
        this.content = content;
        this.createAt = createAt;
        this.hashTag = hashTag;
        this.files = files;
    }
}
