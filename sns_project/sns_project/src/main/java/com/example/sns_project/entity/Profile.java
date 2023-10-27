package com.example.sns_project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Profile {
    @Id
    @Column(name = "profile_id")

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String path;

    private String name;

    private String type;

    private Long size;

    public Profile(Member member, String path, String name, String type, Long size) {
        this.member = member;
        this.path = path;
        this.name = name;
        this.type = type;
        this.size = size;
    }
}
