package com.example.sns_project.websocket.entity;

import com.example.sns_project.websocket.messageform.RoomChat;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.web.socket.WebSocketSession;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@RedisHash(value = "Room")
public class Room {
    @Id
    private String roomId;
    private String roomName;
    private ArrayList<RoomChat> logs = new ArrayList<>();
    private Set<String> users = new HashSet<>();

    @Builder
    public Room(String roomId, String roomName) {
        this.roomId = roomId;
        this.roomName = roomName;
    }

    public void addUser(String username){
        users.add(username);
    }
    public void addLogs(RoomChat roomChat) {
        logs.add(roomChat);
    }
}
