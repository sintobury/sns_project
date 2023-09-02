package com.example.sns_project.security.auth.Jwt;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = null;
        log.info("JwtAuthenticationFilter 진입");
        if(request.getHeader("Authorization") != null && request.getHeader("Authorization").startsWith("Bearer")){
            token = request.getHeader("Authorization").split(" ")[1];
            log.info("토큰 정보 : {}", token);
        }
        if(token != null){
            try {
                jwtTokenProvider.validateAccessToken(token);
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                log.info("토큰인증을 성공적으로 마쳤습니다.");
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }catch (Exception ex){
                throw ex;
            }
        }
        filterChain.doFilter(request, response);
    }
}
