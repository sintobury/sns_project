package com.example.sns_project.controller;

import com.example.sns_project.dto.JoinDto;
import com.example.sns_project.dto.LoginDto;
import com.example.sns_project.dto.MemberDto;
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

    @GetMapping("/member/info")
    public ResponseDto memberInfo(@AuthenticationPrincipal CustomDetails customDetails){
        return memberService.memberInfo(customDetails.getUsername());
    }
    @GetMapping("/member/info/{username}")
    public ResponseDto memberIdInfo(@PathVariable String username){
        log.info("/member/info/{username} 진입");
        return memberService.memberInfo(username);
    }

    @GetMapping("/member/search")
    public ResponseDto memberList(@AuthenticationPrincipal CustomDetails customDetails){
        return memberService.memberList(customDetails.getUsername());

    }
    @GetMapping("/member/search/{name}")
    public ResponseDto memberListByName(@AuthenticationPrincipal CustomDetails customDetails, @PathVariable String name){
        return memberService.memberListByName(customDetails.getUsername(), name);
    }
    @PostMapping("/member/update")
    public ResponseDto memberUpdate(@RequestBody MemberDto memberDto){
        return memberService.memberUpdate(memberDto);
    }
    @PostMapping("/member/profile")
    public ResponseDto memberProfileUploads()
}
