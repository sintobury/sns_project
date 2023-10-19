package com.example.sns_project.websocket;

import com.example.sns_project.security.auth.Jwt.JwtTokenProvider;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class MessageService {
    private final JwtTokenProvider jwtTokenProvider;
    Map<String, StompUser> userData;
    Map<String, Room> chatRoom;

    @PostConstruct
    private void init(){

        chatRoom = new LinkedHashMap<>();
    }
    public void save(String username, String sessionId, String name){
        userData.put(username, new StompUser(sessionId, name));
    }
    public void logout(String username){
        userData.remove(username);
    }
    public Set<StompUser> user(){
        return (Set)userData.values();
    }
}
