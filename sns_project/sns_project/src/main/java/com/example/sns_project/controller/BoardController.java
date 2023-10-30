package com.example.sns_project.controller;

import com.example.sns_project.dto.BoardDto;
import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.entity.Board;
import com.example.sns_project.security.auth.CustomDetails;
import com.example.sns_project.service.BoardService;
import com.example.sns_project.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BoardController {
    private final BoardService boardService;
    private final FileService fileService;
    @PostMapping("/board")
    public ResponseDto saveBoard(@AuthenticationPrincipal CustomDetails customDetails, @RequestBody BoardDto boardDto) throws IOException {
        Board board = boardService.saveBoard(customDetails.getUsername(), boardDto);
        return fileService.saveBoardFile(board, boardDto.getFiles());
    }
    @GetMapping("/board/{name}")
    public ResponseDto getBoardByName(@PathVariable String name) throws MalformedURLException {
        return boardService.getBoard(name);
    }
}
