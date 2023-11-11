package com.example.sns_project.entity;

import com.example.sns_project.dto.BoardDataDto;
import com.example.sns_project.dto.BoardDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
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

    public Board(Member member, String title, String content, LocalDateTime createAt, String hashTag) {
        this.member = member;
        this.title = title;
        this.content = content;
        this.createAt = createAt;
        this.hashTag = hashTag;
    }

    private String hashTag;
    @JsonIgnore
    @OneToMany(mappedBy = "board")
    private List<Comment> comments = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "board")
    private List<Files> files = new ArrayList<>();

    public BoardDataDto convertDto() throws MalformedURLException {
        List<UrlResource> urlResources = new ArrayList<>();
        for (Files file : files) {
            UrlResource urlResource = new UrlResource("file:" + file.getPath());
            urlResources.add(urlResource);
        }
        return new BoardDataDto(this.id, this.title, this.content, this.createAt, this.hashTag, urlResources);
    }
}
