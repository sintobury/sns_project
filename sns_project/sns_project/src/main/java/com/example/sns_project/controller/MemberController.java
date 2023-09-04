package com.example.sns_project.controller;

import com.example.sns_project.dto.JoinDto;
import com.example.sns_project.dto.LoginDto;
import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@Slf4j
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

}
