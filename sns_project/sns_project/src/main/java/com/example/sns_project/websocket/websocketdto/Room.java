package com.example.sns_project.websocket.websocketdto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Data
public class Room {
    private String roomId;
    private String roomName;
    private Set<String> users = new HashSet<>();

    @Builder
    public Room(String roomId, String roomName) {
        this.roomId = roomId;
        this.roomName = roomName;
    }

    public void addUser(String username){
        users.add(username);
    }
}
