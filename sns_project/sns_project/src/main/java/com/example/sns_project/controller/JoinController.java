package com.example.sns_project.controller;

import com.example.sns_project.dto.JoinDto;
import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.service.JoinService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.mapping.Join;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class JoinController {
    private final JoinService joinService;
    @PostMapping("/join")
    public ResponseDto join(@RequestBody JoinDto joinDto){
        log.info("회원가입 핸들러 접근");
        ResponseDto result = joinService.join(joinDto);
        return result;
    }
    @GetMapping("/check/username")
    public ResponseDto validateUsername(@ModelAttribute JoinDto joinDto){
        log.info("아이디 인증 핸들러 접근");
        ResponseDto result = joinService.validateUsername(joinDto);
        return result;

    }
}
