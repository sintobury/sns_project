package com.example.sns_project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Entity
@Getter
public class Board {
    @Id
    @Column(name = "board_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String title;

    private String content;

    private LocalDateTime createAt;

    private String hashTag;

    @JsonIgnore
    @OneToMany(mappedBy = "board")
    private ArrayList<File> file = new ArrayList<>();
}
