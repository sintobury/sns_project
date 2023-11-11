package com.example.sns_project.service;

import com.example.sns_project.dto.BoardDto;
import com.example.sns_project.dto.CommentDto;
import com.example.sns_project.dto.FriendDto;
import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.entity.Board;
import com.example.sns_project.entity.Comment;
import com.example.sns_project.entity.Member;
import com.example.sns_project.repository.BoardRepository;
import com.example.sns_project.repository.CommentRepository;
import com.example.sns_project.repository.FileRepository;
import com.example.sns_project.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

@Service
@RequiredArgsConstructor
@Slf4j
public class BoardService {
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;

    @Transactional
    public Board saveBoard(String username, BoardDto boardDto){
        log.info("글 저장 : {}", boardDto.getTitle());
        Member member = memberRepository.findByUsername(username).get(0);
        Board board = new Board(member, boardDto.getTitle(), boardDto.getContent(), boardDto.getCreateAt(), boardDto.getHashTag());
        log.info("보드 정보 : {}",board);
        boardRepository.save(board);
        return board;
    }
    public ResponseDto getBoard(String name) throws MalformedURLException {
        List<Board> result = boardRepository.findBoardByName(name);
        List<BoardDto> boardList = new ArrayList<>();
        for (Board board : result) {
            boardList.add(board.convertDto());
        }
        return new ResponseDto(HttpStatus.OK.value(), "성공적으로 반환완료", boardList);
    }
    public ResponseDto getBoardByContent(String content) throws MalformedURLException {
        List<Board> result = boardRepository.findBoardByContent(content);
        List<BoardDto> boardList = new ArrayList<>();
        for (Board board : result) {
            boardList.add(board.convertDto());
        }
        return new ResponseDto(HttpStatus.OK.value(), "성공적으로 반환완료", boardList);
    }
    public ResponseDto getFriendBoard(List<FriendDto> friends) throws MalformedURLException {
        List<BoardDto> boardList = new ArrayList<>();
        for (FriendDto friend : friends) {
            List<Board> result = boardRepository.findBoardByName(friend.getMember().getName());
            for (Board board : result) {
                boardList.add(board.convertDto());
            }
        }
        return new ResponseDto(HttpStatus.OK.value(), "성공적으로 반환완료", boardList);
    }
    public ResponseDto deleteBoard(BoardDto boardDto){
        Board board = boardRepository.findById(boardDto.getId());
        boardRepository.deleteBoard(board);
        return new ResponseDto(HttpStatus.OK.value(), "게시글 삭제 완료", null);
    }
    @Transactional
    public ResponseDto saveComment(String username, CommentDto commentDto){
        Member member = memberRepository.findByUsername(username).get(0);
        Board board = boardRepository.findById(commentDto.getBoardId());
        Comment comment = new Comment(member, board, commentDto.getContent(), commentDto.getCreateAt(), commentDto.getState());
        commentRepository.save(comment);
        commentDto.setCommentId(comment.getId());
        return new ResponseDto(HttpStatus.OK.value(), "댓글 작성 작성", commentDto);
    }
    public ResponseDto deleteComment(CommentDto commentDto){
        Comment comment = commentRepository.findById(commentDto.getCommentId());
        commentRepository.delete(comment);
        return new ResponseDto(HttpStatus.OK.value(), "댓글 삭제 완료", null);
    }
    public ResponseDto getComment(BoardDto boardDto){
        Board board = boardRepository.findByIdFetchComment(boardDto.getId());
        List<Comment> comments = board.getComments();
        ArrayList<CommentDto> result = new ArrayList<>();
        for (Comment comment : comments) {
            result.add(comment.convertDto());
        }
        return new ResponseDto(HttpStatus.OK.value(), "댓글 가져오기 완료", result);
    }
}
