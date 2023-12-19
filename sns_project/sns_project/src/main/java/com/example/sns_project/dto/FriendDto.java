package com.example.sns_project.dto;

import com.example.sns_project.enums.FriendEnum;
import lombok.Data;

@Data
public class FriendDto {
    private Long id;
    private MemberDto member;
    private Boolean request;
    private FriendEnum state;

    public FriendDto(Long id, MemberDto member, Boolean request, FriendEnum state) {
        this.id = id;
        this.member = member;
        this.request = request;
        this.state = state;
    }
}
