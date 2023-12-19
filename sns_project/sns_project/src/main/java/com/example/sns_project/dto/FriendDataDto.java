package com.example.sns_project.dto;

import lombok.Data;

@Data
    public class FriendDataDto {
    private Long requestId;
    private Long requestedId;
    private String state;

    public FriendDataDto(Long requestId, Long requestedId, String state) {
        this.requestId = requestId;
        this.requestedId = requestedId;
        this.state = state;
    }
}
