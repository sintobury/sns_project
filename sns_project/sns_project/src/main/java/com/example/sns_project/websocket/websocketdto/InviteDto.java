package com.example.sns_project.websocket.websocketdto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class InviteDto {
    private List<String> usernames;
    private List<String> names;
    private String roomId;

    public InviteDto(List<String> usernames, List<String> names, String roomId) {
        this.usernames = usernames;
        this.names = names;
        this.roomId = roomId;
    }
}
