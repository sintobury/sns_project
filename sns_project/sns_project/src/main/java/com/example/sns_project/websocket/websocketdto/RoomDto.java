package com.example.sns_project.websocket.websocketdto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RoomDto {
    private String roomName;
    private String username;

    public RoomDto(String roomName, String username) {
        this.roomName = roomName;
        this.username = username;
    }
}
