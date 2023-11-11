package com.example.sns_project.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.UrlResource;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class BoardDataDto {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createAt;
    private String hashTag;
    private List<UrlResource> urlResources;

    public BoardDataDto(Long id, String title, String content, LocalDateTime createAt, String hashTag, List<UrlResource> urlResources) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createAt = createAt;
        this.hashTag = hashTag;
        this.urlResources = urlResources;
    }
}
