package com.example.sns_project.websocket.websocketdto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class RoomDto {
    private String roomId;
    private String roomName;
    private List<String> usernames;


    public RoomDto(String roomName, List<String> usernames) {
        this.roomName = roomName;
        this.usernames = usernames;
    }
}
