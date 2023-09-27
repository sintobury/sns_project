package com.example.sns_project.service;

import com.example.sns_project.dto.*;
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
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.StringTokenizer;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public Member findByUsername(String username){
        Member member = memberRepository.findByUsername(username).get(0);
        return member;
    }

    public ResponseDto memberInfo(String username){
        log.info("MemberService memberInfo 접근");
        Member member = memberRepository.findByUsername(username).get(0);
        MemberDto memberDto = member.convertDto();
        return new ResponseDto(HttpStatus.OK.value(), "유저정보를 성공적으로 반환하였습니다.", memberDto);
    }

    public ResponseDto memberUpdate(MemberDto memberDto){
        List<Member> findMember = memberRepository.findByUsername(memberDto.getUsername());
        if(findMember.size() == 0){
            return new ResponseDto(HttpStatus.BAD_REQUEST.value(), "유저 정보가 없습니다.", null);
        }else{
            Member member = findMember.get(0);
            member.setName(memberDto.getName());
            member.setBirth(memberDto.getBirth());
            member.setEmail(memberDto.getEmail());
            member.setGender(memberDto.getGender());
            memberRepository.save(member);
            return new ResponseDto(HttpStatus.OK.value(), "변경사항이 정상적으로 저장되었습니다.", memberDto);
        }
    }





}
