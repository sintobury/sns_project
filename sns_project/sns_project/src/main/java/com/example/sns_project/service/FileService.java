package com.example.sns_project.service;

import com.example.sns_project.dto.BoardDto;
import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.entity.Board;
import com.example.sns_project.entity.Files;
import com.example.sns_project.entity.Member;
import com.example.sns_project.entity.Profile;
import com.example.sns_project.repository.FileRepository;
import com.example.sns_project.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileService {
    private final MemberRepository memberRepository;
    private final FileRepository fileRepository;
    private static String profileUrl = "/profile/";
    private static String boardUrl = "/board/";
    private String getProfileFullPath(String filename){
        return profileUrl + filename;
    }
    private String getBoardFullPath(String filename){
        return boardUrl+ filename;
    }

    @Transactional
    public ResponseDto saveProfile(String username, MultipartFile file) throws IOException {
        if(file.isEmpty()){
            log.info("saveProfile 프로필 비우기");
            Profile profile = fileRepository.findProfileByUsername(username).get(0);
            profile.setName(null);
            profile.setType(null);
            profile.setPath(null);
            profile.setSize(null);
            fileRepository.saveProfile(profile);
            return new ResponseDto(HttpStatus.OK.value(), "프로필을 비웠습니다" , null);
        }
        log.info("saveProfile 프로필 저장하기");
        Member member = memberRepository.findByUsername(username).get(0);
        String originalFilename = file.getOriginalFilename();
        String type = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString() + "." + type;
        String path = getProfileFullPath(uuid);
        log.info("저장 될 경로 : {}", uuid);
        file.transferTo(new File(path));
        Profile profile = new Profile(member, path, file.getName(), type, file.getSize());
        fileRepository.saveProfile(profile);
        return new ResponseDto(HttpStatus.OK.value(), "저장 완료" , null);    }
    @Transactional
    public ResponseDto saveBoardFile(Board board, List<MultipartFile> files) throws IOException {
        for (MultipartFile file : files) {
            log.info("게시글 파일 저장 : {}", file.getName());
            String originalFilename = file.getOriginalFilename();
            String type = extractExt(originalFilename);
            String uuid = UUID.randomUUID().toString() + "." + type;
            String path = getBoardFullPath(uuid);
            file.transferTo(new File(path));
            Files data = new Files(board, path, file.getName(), type, file.getSize());
            fileRepository.saveBoardFile(data);
        }
        return new ResponseDto(HttpStatus.OK.value(), "저장 완료", null);
    }


    private String extractExt(String originalFilename){
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }
    public ResponseDto getProfile(String username) throws MalformedURLException {
        Profile profile = fileRepository.findProfileByUsername(username).get(0);
        if(profile.getPath() == null){
            log.info("빈 프로필 반환");
            return new ResponseDto(HttpStatus.OK.value(), "프로필이 비어있습니다.", null);
        }else{
            log.info("프로필 반환");
            return new ResponseDto(HttpStatus.OK.value(), "프로필 반환.", new UrlResource("file:" + profile.getPath()));
        }
    }
}
