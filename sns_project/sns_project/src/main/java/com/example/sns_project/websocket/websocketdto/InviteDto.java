package com.example.sns_project.websocket.websocketdto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class InviteDto {
    private String username;
    private String name;
    private String roomId;

    public InviteDto(String username, String name, String roomId) {
        this.username = username;
        this.name = name;
        this.roomId = roomId;
    }
}
