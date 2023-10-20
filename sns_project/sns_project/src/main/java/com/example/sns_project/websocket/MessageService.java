package com.example.sns_project.websocket;

import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.security.auth.Jwt.JwtTokenProvider;
import com.example.sns_project.websocket.websocketdto.Room;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class MessageService {

    Map<String, Room> chatRoom;

    @PostConstruct
    private void init(){
        chatRoom = new LinkedHashMap<>();
    }
    public void makeRoom(String roomName, String username){
        String roomId = UUID.randomUUID().toString();
        Room room = Room.builder().roomId(roomId).roomName(roomName).build();
        room.addUser(username);
        chatRoom.put(roomId, room);
    }
    public Room findById(String roomId){
        return chatRoom.get(roomId);
    }

    public void inviteUser(String roomId, String username){
        Room room = chatRoom.get(roomId);
        room.addUser(username);
    }
    public ResponseDto findMyRoom(String username){
        ArrayList<Room> rooms = new ArrayList<>(chatRoom.values());
        ArrayList<String> result = new ArrayList<>();
        for (Room room : rooms) {
            if(room.getUsers().contains(username)){
                result.add(room.getRoomId());
            }
        }
        return new ResponseDto(HttpStatus.OK.value(), "내가 속한 채탕방 반환", result);
    }


}
