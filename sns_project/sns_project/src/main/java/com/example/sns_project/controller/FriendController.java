package com.example.sns_project.controller;

import com.example.sns_project.dto.FriendDataDto;
import com.example.sns_project.dto.FriendDto;
import com.example.sns_project.dto.MemberDto;
import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.entity.Member;
import com.example.sns_project.security.auth.CustomDetails;
import com.example.sns_project.service.FriendService;
import com.example.sns_project.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class FriendController {
    private final FriendService friendService;
    private final MemberService memberService;
    @GetMapping("/friend")
    public ResponseDto getFriendList(@AuthenticationPrincipal CustomDetails customDetails){
        log.info("친구 리스트 핸들러");
        Member member = memberService.findByUsername(customDetails.getUsername());
        return friendService.findFriendList(member.getId());
    }
    @GetMapping("/friend/request")
    public ResponseDto getRequestFriendList(@AuthenticationPrincipal CustomDetails customDetails){
        log.info("친구 요청 리스트 핸들러");
        Member member = memberService.findByUsername(customDetails.getUsername());
        return friendService.findWaitRequestFriendList(member.getId());
    }
    @GetMapping("/friend/requested")
    public ResponseDto getRequestedFriendList(@AuthenticationPrincipal CustomDetails customDetails){
        log.info("친구 요청받은 리스트 핸들러");
        Member member = memberService.findByUsername(customDetails.getUsername());
        return friendService.findWaitRequestedFriendList(member.getId());
    }
    @PostMapping("/friend")
    public ResponseDto addFriend(@AuthenticationPrincipal CustomDetails customDetails, @RequestBody FriendDataDto friendDataDto){
        log.info("친구 추가 핸들러");
        Member member = memberService.findByUsername(customDetails.getUsername());
        return friendService.save(new FriendDataDto(member.getId(), friendDataDto.getRequestedId(), null));
    }
    @GetMapping("/check/friend")
    public ResponseDto checkFriend(@AuthenticationPrincipal CustomDetails customDetails, @RequestBody FriendDataDto friendDataDto){
        log.info("친구 체크 핸들러");
        Member member = memberService.findByUsername(customDetails.getUsername());
        return friendService.checkFriendRequest(new FriendDataDto(member.getId(), friendDataDto.getRequestedId(), null));
    }
    @PostMapping("/friend/accept")
    public ResponseDto acceptFriend(@RequestBody FriendDto friendDto){
        log.info("친구 수락 핸들러");
        return friendService.acceptFriendRequest(friendDto.getId());
    }
    @DeleteMapping("/friend")
    public ResponseDto deleteFriend(@RequestBody FriendDto friendDto){
        log.info("친구 삭제 핸들러");
        return friendService.deleteFriend(friendDto);
    }
}
