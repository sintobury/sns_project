package com.example.sns_project.security.auth.Jwt;

import com.example.sns_project.dto.ResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtExceptionFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);

        }catch (JwtException e){
            setErrorResponse(request, response, e);
        }
    }
    public void setErrorResponse(HttpServletRequest req, HttpServletResponse res, Throwable ex) throws IOException {

        res.setContentType(MediaType.APPLICATION_JSON_VALUE);

        ResponseDto responseDto = new ResponseDto(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage(), null);
        final ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(res.getOutputStream(), responseDto);
        res.setStatus(HttpServletResponse.SC_OK);
    }
}
