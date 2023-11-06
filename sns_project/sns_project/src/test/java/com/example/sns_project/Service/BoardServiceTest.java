package com.example.sns_project.Service;

import com.example.sns_project.dto.BoardDto;
import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.entity.Board;
import com.example.sns_project.entity.Member;
import com.example.sns_project.enums.MemberRole;
import com.example.sns_project.repository.MemberRepository;
import com.example.sns_project.service.BoardService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.net.MalformedURLException;
import java.time.LocalDateTime;

@SpringBootTest
@Transactional
public class BoardServiceTest {
    @Autowired
    private BoardService boardService;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private MemberRepository memberService;

    @Test
    void saveBoard() throws MalformedURLException {
        Member member = new Member("test", "test", "test", "test", LocalDateTime.now(), "test", "test", LocalDateTime.now(), MemberRole.ROLE_USER);
        memberRepository.save(member);
        BoardDto boardDto = new BoardDto("title", "content", LocalDateTime.now(), "hash", null);
        Board board = boardService.saveBoard("test", boardDto);
        ResponseDto test = boardService.getBoard("test");
    }
}
