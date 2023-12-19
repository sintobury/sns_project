package com.example.sns_project.websocket.messageform;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RoomChat {
    private String sender;
    private String senderName;
    private String roomId;
    private String message;

    public RoomChat(String sender, String senderName, String roomId, String message) {
        this.sender = sender;
        this.senderName = senderName;
        this.roomId = roomId;
        this.message = message;
    }
}
