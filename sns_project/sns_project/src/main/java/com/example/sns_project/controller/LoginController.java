package com.example.sns_project.controller;

import com.example.sns_project.dto.LoginDto;
import com.example.sns_project.dto.RefreshDto;
import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.service.LoginService;
import com.example.sns_project.service.MemberService;
import com.example.sns_project.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;
    private final RefreshTokenService refreshTokenService;
    @PostMapping("/login")
    public ResponseDto login(@RequestBody LoginDto loginDto){
        log.info("로그인 핸들러 접근");
        ResponseDto result = loginService.login(loginDto);
        return result;
    }
    @PostMapping("/logout")
    public ResponseDto logout(@RequestBody RefreshDto refreshDto){
        ResponseDto result = loginService.logout(refreshDto);
        return result;
    }
    @PostMapping("/refresh")
    public ResponseDto refreshToken(@RequestBody RefreshDto refreshDto){
        log.info("리프레시 핸들러 접근");
        ResponseDto result = refreshTokenService.refreshToken(refreshDto);
        return result;
    }

}
