package com.example.sns_project.websocket;

import lombok.Data;

@Data
public class StompUser {
    public StompUser(String sessionId, String name) {
        this.sessionId = sessionId;
        this.name = name;
    }

    private String sessionId;
    private String name;
}
