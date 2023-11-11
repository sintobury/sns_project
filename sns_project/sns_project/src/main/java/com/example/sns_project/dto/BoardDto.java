package com.example.sns_project.dto;

import com.example.sns_project.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardDto {
    private String title;

    private String content;

    private LocalDateTime createAt;

    private String hashTag;

    private List<MultipartFile> files;

}
