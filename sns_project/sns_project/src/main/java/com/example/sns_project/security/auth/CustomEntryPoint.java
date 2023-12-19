package com.example.sns_project.security.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Spring Security는 인증 인가 실패시 FilterSecurityInterceptor가 2가지 예외를 발생시킵니다.
 * 인증 예외가 생기면 AuthenticationException을 발생시키는데 이는 AuthenticationEntryPoint를 implement하여 구현할 수 있다.
 */

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomEntryPoint implements AuthenticationEntryPoint {
    private final ObjectMapper objectMapper;
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
       // jwtExceptionFilter로 처리
        log.info("오류페이지 진입");
    }
}
