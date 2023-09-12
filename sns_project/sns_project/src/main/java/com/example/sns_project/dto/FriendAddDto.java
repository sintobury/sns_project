package com.example.sns_project.dto;

import lombok.Data;

@Data
public class FriendAddDto {
    private Long memberId;
    private Long friendId;

    public FriendAddDto(Long memberId, Long friendId) {
        this.memberId = memberId;
        this.friendId = friendId;
    }
}
