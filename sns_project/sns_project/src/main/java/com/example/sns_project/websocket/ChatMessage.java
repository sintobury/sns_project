package com.example.sns_project.websocket;

import lombok.Data;

import java.awt.*;

@Data
public class ChatMessage {

    private String type;
    private String roomId;
    private String sender;
    private String message;
}
