package com.example.sns_project.entity;

import com.example.sns_project.dto.MemberDto;
import com.example.sns_project.enums.Gender;
import com.example.sns_project.enums.MemberRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String username;

    private String password;

    private String name;

    private String email;

    private LocalDateTime createAt;

    private String provider;

    private String gender;

    private LocalDateTime birth;

    @Enumerated(EnumType.STRING)
    private MemberRole role;

    // friend에서 내가 member_id 인 경우
    @JsonIgnore
    @OneToMany(mappedBy = "friendRequest")
    private List<Friend> friendRequestList = new ArrayList<>();

    // friend에서 내가 friend_member_id인 경우
    @JsonIgnore
    @OneToMany(mappedBy = "friendRequested")
    private List<Friend> friendRequestedList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "member")
    private List<Board> boardList = new ArrayList<>();

    @JsonIgnore
    @OneToOne(mappedBy = "member")
    private Profile profile;

    @Builder
    public Member(String username, String password, String name, String email, LocalDateTime createAt, String provider, String gender, LocalDateTime birth, MemberRole role) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
        this.createAt = createAt;
        this.provider = provider;
        this.gender = gender;
        this.birth = birth;
        this.role = role;
    }
    public MemberDto convertDto(){
        if(this.profile == null){
            return new MemberDto(this.getId(),this.getUsername(), this.getName(), this.getEmail(), this.getCreateAt(), this.getProvider(), this.getGender(), this.getBirth(), null  );

        }else{
            return new MemberDto(this.getId(),this.getUsername(), this.getName(), this.getEmail(), this.getCreateAt(), this.getProvider(), this.getGender(), this.getBirth(), this.profile.convertDto()  );
        }

    }

}
