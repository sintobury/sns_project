package com.example.sns_project.websocket;

import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.security.auth.CustomDetails;
import com.example.sns_project.websocket.messageform.Chat;
import com.example.sns_project.websocket.websocketdto.InviteDto;
import com.example.sns_project.websocket.websocketdto.Room;
import com.example.sns_project.websocket.messageform.RoomChat;
import com.example.sns_project.websocket.websocketdto.RoomDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@Slf4j
@RequiredArgsConstructor
public class MessageController {
    private final SimpMessageSendingOperations messageTemplate;
    private final MessageService messageService;
    @MessageMapping("/message/sendToUser")
    public void send(Chat chat){
        log.info("destination : {}   message : {}", chat.getSender(), chat.getMessage());
       messageTemplate.convertAndSendToUser(chat.getReceiver(), "topic/data", chat);
    }
    @MessageMapping("/message/sendToRoom/send")
    public void send(RoomChat roomChat)  {
        Room room = messageService.findById(roomChat.getRoomId());
        Set<String> users = room.getUsers();
        log.info("destination : {}   message : {}", roomChat.getRoomId(), roomChat.getMessage());
        for (String username : users) {
            log.info("채탕방에 접속중인 유저 ID : {}",username );
            sendMessage(username, roomChat);
        }
    }
    @MessageMapping("/message/sendToRoom/invite")
    public void invite(@RequestBody InviteDto inviteDto) {
        Room room = messageService.findById(inviteDto.getRoomId());
        RoomChat roomChat = new RoomChat("admin", inviteDto.getRoomId(), inviteDto.getName() + "님이 입장하셨습니다.");
        Set<String> users = room.getUsers();
        for (String username : users) {
            log.info("채탕방에 접속중인 유저 ID : {}",username );
            sendMessage(username, roomChat);
        }
        messageService.inviteUser(inviteDto.getRoomId(), inviteDto.getUsername());
    }
    @PostMapping("/room")
    public ResponseDto makeRoom(@RequestBody RoomDto room) {
        messageService.makeRoom(room.getRoomName(), room.getUsername());
        return new ResponseDto(HttpStatus.OK.value(), "방 생성에 성공하였습니다.", null);
    }
    @GetMapping("/room/{username}")
    public ResponseDto findMyRoom(@PathVariable String username){
       return messageService.findMyRoom(username);
    }
    @Async
    protected void sendMessage(String username, RoomChat roomChat){
        messageTemplate.convertAndSendToUser(username, "topic/data", roomChat);
    }
}
