package com.example.sns_project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.UrlResource;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardDataDto {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createAt;
    private String hashTag;
    private List<FileDto>  boardFiles;


}
