package com.example.sns_project.dto;

import jdk.jfr.Name;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileDto {
    private Long id;
    private String path;

    private String name;

    private String type;

    private Long size;
}
