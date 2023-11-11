package com.example.sns_project.dto;

import com.example.sns_project.entity.Member;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BoardDto {
    private String title;
    private String content;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createAt;
    private String hashTag;
    private List<MultipartFile> files;

}
