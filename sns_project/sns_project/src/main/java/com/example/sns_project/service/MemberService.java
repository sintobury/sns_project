package com.example.sns_project.service;

import com.example.sns_project.dto.JoinDto;
import com.example.sns_project.dto.LoginDto;
import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.dto.TokenDto;
import com.example.sns_project.entity.Member;
import com.example.sns_project.enums.MemberRole;
import com.example.sns_project.repository.MemberRepository;
import com.example.sns_project.repository.RedisRepository;
import com.example.sns_project.security.auth.Jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.StringTokenizer;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;





}
