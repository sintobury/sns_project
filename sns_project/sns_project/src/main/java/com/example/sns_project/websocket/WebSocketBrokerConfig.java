package com.example.sns_project.websocket;

import com.example.sns_project.security.auth.Jwt.JwtTokenProvider;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
@Slf4j
@EnableWebSocketMessageBroker
public class WebSocketBrokerConfig implements WebSocketMessageBrokerConfigurer {
    private final JwtTokenProvider jwtTokenProvider;
    private final MessageService messageService;
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws/chat").setAllowedOriginPatterns("*");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic", "/queue");
        registry.setApplicationDestinationPrefixes("/app");
        registry.setUserDestinationPrefix("/user");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {

        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                if(StompCommand.CONNECT.equals(accessor.getCommand())){
                    try{
                        /**
                         * 메인 코드
                         */
                        String accessToken = accessor.getFirstNativeHeader("accessToken");
                        jwtTokenProvider.validateAccessToken(accessToken);
                        Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
                        accessor.setUser(authentication);
                        String username = jwtTokenProvider.findUsernameByAccess(accessToken);
                        String name = jwtTokenProvider.findUsernameByAccess(accessToken);
                        String sessionId = accessor.getSessionId();
                        log.info("접속한 유저 : {}   유저의 세션 값 : {}",username, sessionId);


                        /**
                         * 테스트 코드
                         */
                   /*     String username = accessor.getFirstNativeHeader("username");
                        String sessionId = accessor.getSessionId();
                        List<GrantedAuthority> authorities = new ArrayList<>();
                        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
                        Authentication auth = new UsernamePasswordAuthenticationToken(username, username, authorities);
                        SecurityContextHolder.getContext().setAuthentication(auth);
                        accessor.setUser(auth);
                        log.info("접속한 유저 : {}   유저의 세션 값 : {}   auth : {}",username, sessionId, auth);*/
                    }catch (JwtException ex){
                        throw ex;
                    }
                }
                if(StompCommand.DISCONNECT.equals(accessor.getCommand())){
                    try{
                        String accessToken = accessor.getFirstNativeHeader("accessToken");
                        jwtTokenProvider.validateAccessToken(accessToken);
                        String username = jwtTokenProvider.findUsernameByAccess(accessToken);
                        String sessionId = accessor.getSessionId();
                        log.info("로그아웃한 유저 : {}   유저의 세션 값 : {}",username, sessionId);

                    }catch (JwtException ex){
                        throw ex;
                    }
                }
                return message;
            }

        });
    }

}
