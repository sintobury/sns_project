package com.example.sns_project.websocket;

import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.repository.RoomRepository;
import com.example.sns_project.websocket.entity.Room;
import com.example.sns_project.websocket.websocketdto.RoomDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class MessageService {
    private final RoomRepository roomRepository;

    public ResponseDto makeRoom(RoomDto roomDto){
        String roomId = UUID.randomUUID().toString();
        Room room = Room.builder().roomId(roomId).roomName(roomDto.getRoomName()).build();
        List<String> usernames = roomDto.getUsernames();
        for (String username : usernames) {
            room.addUser(username);
        }
        roomRepository.save(room);
        roomDto.setRoomId(roomId);
        return new ResponseDto(HttpStatus.OK.value(), "방 생성 성공", roomDto);
    }
    public Room findById(String roomId){
        return roomRepository.findById(roomId).get();
    }

    public void inviteUser(String roomId, List<String> usernames){
        Room room =  roomRepository.findById(roomId).get();
        for (String username : usernames) {
            room.addUser(username);
        }
        roomRepository.save(room);
    }
    public ResponseDto findMyRoom(String username){
        ArrayList<Room> rooms = roomRepository.findAll();
        ArrayList<String> result = new ArrayList<>();
        for (Room room : rooms) {
            if(room.getUsers().contains(username)){
                result.add(room.getRoomId());
            }
        }
        return new ResponseDto(HttpStatus.OK.value(), "내가 속한 채탕방 반환", result);
    }


}
