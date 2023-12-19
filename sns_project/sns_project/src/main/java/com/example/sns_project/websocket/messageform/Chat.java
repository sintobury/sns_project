package com.example.sns_project.websocket.messageform;

import lombok.Data;

@Data
public class Chat {

    private String sender;
    private String receiver;
    private String message;

}