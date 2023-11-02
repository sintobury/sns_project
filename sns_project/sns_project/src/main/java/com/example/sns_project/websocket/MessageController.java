package com.example.sns_project.websocket;

import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.websocket.messageform.Chat;
import com.example.sns_project.websocket.websocketdto.InviteDto;
import com.example.sns_project.websocket.entity.Room;
import com.example.sns_project.websocket.messageform.RoomChat;
import com.example.sns_project.websocket.websocketdto.RoomDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@Slf4j
@RequiredArgsConstructor
public class MessageController {
    private final SimpMessageSendingOperations messageTemplate;
    private final MessageService messageService;

  /*  // 유저한테 메세지 보낼시 1:1 채팅방이 생성되며 유저를 초대할 수 있음.
    @MessageMapping("/message/sendToUser")
    public void send(Chat chat){
        Room room = messageService.makeRoom(chat.getSender() + "님의 채팅방", chat.getSender());
        room.addUser(chat.getReceiver());
        Set<String> users = room.getUsers();
        log.info("destination : {}   message : {}", chat.getSender(), chat.getMessage());
        for (String username : users) {
            log.info("채탕방에 접속중인 유저 ID : {}", username );
            sendMessage(username, new RoomChat());
        }
    }*/
    // 채팅방 유저한테 메세지를 보낼 때 사용
    @MessageMapping("/message/sendToRoom/send")
    @Async
    public void send(RoomChat roomChat)  {
        Room room = messageService.findById(roomChat.getRoomId());
        Set<String> users = room.getUsers();
        log.info("destination : {}   message : {}", roomChat.getRoomId(), roomChat.getMessage());
        room.addLogs(roomChat);
        messageService.updateRoom(room);
        for (String username : users) {
            log.info("채탕방에 접속중인 유저 ID : {}",username );
            sendMessage(username, roomChat);
        }
    }
    // 채팅방에 유저를 초대할 때 사용
    @MessageMapping("/message/sendToRoom/invite")
    public void invite(@RequestBody InviteDto inviteDto) {
        Room room = messageService.findById(inviteDto.getRoomId());
        List<String> names = inviteDto.getNames();
        Set<String> users = room.getUsers();
        for (String name : names) {
            RoomChat roomChat = new RoomChat("admin", "admin",inviteDto.getRoomId(), name + "님이 입장하셨습니다.");
            for (String username : users) {
                log.info("채탕방에 접속중인 유저 ID : {}",username );
                sendMessage(username, roomChat);
            }
        }
        messageService.inviteUser(inviteDto.getRoomId(), inviteDto.getUsernames());
    }
    @PostMapping("/room")
    public ResponseDto makeRoom(@RequestBody RoomDto room) {
        return  messageService.makeRoom(room);
    }
    @GetMapping("/room/{username}")
    public ResponseDto findMyRoom(@PathVariable String username){
       return messageService.findMyRoom(username);
    }
    @Async
    @GetMapping("/room/logs/{roomId}")
    public ResponseDto findLogs(@PathVariable String roomId){
        return messageService.findMyLogsById(roomId);
    }
    @Async
    protected void sendMessage(String username, RoomChat roomChat){
        messageTemplate.convertAndSendToUser(username, "topic/data", roomChat);
    }
}
