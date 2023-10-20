package com.example.sns_project.websocket.messageform;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RoomChat {
    private String sender;
    private String roomId;
    private String message;

    public RoomChat(String sender, String roomId, String message) {
        this.sender = sender;
        this.roomId = roomId;
        this.message = message;
    }
}
