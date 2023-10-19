package com.example.sns_project.websocket;

import com.example.sns_project.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.converter.SimpleMessageConverter;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@Slf4j
@RequiredArgsConstructor
public class MessageController {
    private final SimpMessageSendingOperations messageTemplate;
    private final MessageService messageService;
    @MessageMapping("/chat/enter")
    public void enter(Chat chat, StompHeaderAccessor session){
        chat.setMessage(chat.getSender() + "님이 채팅방에 입장하셨습니다.");
       messageTemplate.convertAndSend("/topic/chat/" + chat.getRoomId(), chat);
    }
    @MessageMapping("/chat/message")
    public void message(Chat chat){
        messageTemplate.convertAndSend("/topic/chat/" + chat.getRoomId(), chat);

    }

}
