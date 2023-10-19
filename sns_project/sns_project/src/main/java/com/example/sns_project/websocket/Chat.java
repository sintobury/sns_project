package com.example.sns_project.websocket;

import lombok.Data;

@Data
public class Chat {
    public enum MessageType{ENTER, TALK}
    private MessageType type;
    private Long roomId;
    private String sender;
    private String message;

}