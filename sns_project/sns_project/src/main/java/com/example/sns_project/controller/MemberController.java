package com.example.sns_project.controller;

import com.example.sns_project.dto.JoinDto;
import com.example.sns_project.dto.LoginDto;
import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.entity.Member;
import com.example.sns_project.security.auth.CustomDetails;
import com.example.sns_project.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;


@RestController
@Slf4j
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/info")
    public ResponseDto memberInfo(@AuthenticationPrincipal CustomDetails customDetails){
        return memberService.memberInfo(customDetails.getUsername());
    }
    @GetMapping("/info/{username}")
    public ResponseDto memberIdInfo(@RequestParam("username") String username){
        return memberService.memberInfo(username);
    }

}
