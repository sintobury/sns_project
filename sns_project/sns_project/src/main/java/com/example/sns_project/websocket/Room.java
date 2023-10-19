package com.example.sns_project.websocket;

import lombok.Data;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Data
public class Room {
    private Long roomId;
    private String roomName;
    private Set<WebSocketSession> sessions = new HashSet<>();

}
