package com.example.sns_project.controller;

import com.example.sns_project.dto.BoardDto;
import com.example.sns_project.dto.CommentDto;
import com.example.sns_project.dto.FriendDto;
import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.entity.Board;
import com.example.sns_project.entity.Member;
import com.example.sns_project.security.auth.CustomDetails;
import com.example.sns_project.service.BoardService;
import com.example.sns_project.service.FileService;
import com.example.sns_project.service.FriendService;
import com.example.sns_project.service.MemberService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BoardController {
    private final BoardService boardService;
    private final FileService fileService;
    private  final FriendService friendService;
    private final MemberService memberService;
    @PostMapping("/board")
    public ResponseDto saveBoard(@AuthenticationPrincipal CustomDetails customDetails, @RequestBody BoardDto boardDto, @RequestParam List<MultipartFile> files) throws IOException {
        log.info("게시글 저장 핸들러");
        Board board = boardService.saveBoard(customDetails.getUsername(), boardDto);
        return fileService.saveBoardFile(board, files);
    }
    @GetMapping("/board/{name}")
    public ResponseDto getBoardByName(@PathVariable String name) throws MalformedURLException {
        return boardService.getBoard(name);
    }
    @GetMapping("/board/friend")
    public ResponseDto getBoardFriend(@AuthenticationPrincipal CustomDetails customDetails) throws MalformedURLException {
        Member member = memberService.findByUsername(customDetails.getUsername());
        List<FriendDto> result = (List<FriendDto>)friendService.findFriendList(member.getId()).getResult();
        return boardService.getFriendBoard(result);
    }
    @DeleteMapping("/board")
    public ResponseDto deleteBoardByName(@RequestBody BoardDto boardDto){
        return boardService.deleteBoard(boardDto);
    }
    @PostMapping("/comment")
    public ResponseDto saveComment(@AuthenticationPrincipal CustomDetails customDetails, @RequestBody CommentDto commentDto){
        return boardService.saveComment(customDetails.getUsername(), commentDto);
    }
    @DeleteMapping("/comment")
    public ResponseDto deleteComment(@RequestBody CommentDto commentDto){
        return boardService.deleteComment(commentDto);
    }
}
