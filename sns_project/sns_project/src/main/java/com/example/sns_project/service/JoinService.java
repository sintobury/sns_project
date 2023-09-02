package com.example.sns_project.service;

import com.example.sns_project.dto.JoinDto;
import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.entity.Member;
import com.example.sns_project.enums.MemberRole;
import com.example.sns_project.repository.MemberRepository;
import com.example.sns_project.repository.RedisRepository;
import com.example.sns_project.security.auth.Jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class JoinService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    public ResponseDto join(JoinDto joinDto){
        Member searchResult = memberRepository.findByUsername(joinDto.getUsername());
        if(!joinDto.getPassword().equals(joinDto.getPasswordAgain())){
            return new ResponseDto(HttpStatus.BAD_REQUEST.value(), "비밀번호가 일치하지 않습니다", null);
        }
        else if(searchResult != null){
            return new ResponseDto(HttpStatus.BAD_REQUEST.value(), "중복된 아이디가 존재합니다", null);
        }else{
            Member member = new Member(joinDto.getUsername(), bCryptPasswordEncoder.encode(joinDto.getPassword()), joinDto.getName(), joinDto.getEmail(), LocalDateTime.now(), "origin", joinDto.getGender(), MemberRole.ROLE_USER);
            memberRepository.save(member);
            return new ResponseDto(HttpStatus.OK.value(), "회원가입에 성공하였습니다.", joinDto);
        }
    }
}
