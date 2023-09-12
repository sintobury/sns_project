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
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class JoinService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    public ResponseDto join(JoinDto joinDto){
        Member member = new Member(joinDto.getUsername(), bCryptPasswordEncoder.encode(joinDto.getPassword()), joinDto.getName(), joinDto.getEmail(), LocalDateTime.now(), "origin", joinDto.getGender(), joinDto.getBirth(),MemberRole.ROLE_USER);
        memberRepository.save(member);
        return new ResponseDto(HttpStatus.OK.value(), "회원가입에 성공하였습니다.", joinDto);
    }
    public ResponseDto validateUsername(JoinDto joinDto){
        List<Member> searchResult = memberRepository.findByUsername(joinDto.getUsername());

        if(searchResult.size() != 0){
            log.info("중복된 아이디가 있습니다.");
            return new ResponseDto(HttpStatus.BAD_REQUEST.value(), "중복된 아이디가 있습니다.", null);
        }else{
            log.info("사용가능한 아아디 입니다.");
            return new ResponseDto(HttpStatus.OK.value(), "해당 아이디는 사용가능 합니다.", null);
        }
    }
}
