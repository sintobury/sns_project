package com.example.sns_project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Files {
    @Id
    @Column(name = "file_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    private String path;

    private String name;

    private String type;

    private Long size;

    public Files(Board board, String path, String name, String type, Long size) {
        this.board = board;
        this.path = path;
        this.name = name;
        this.type = type;
        this.size = size;
    }
}
