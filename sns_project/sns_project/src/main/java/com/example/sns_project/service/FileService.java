package com.example.sns_project.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.example.sns_project.dto.BoardDto;
import com.example.sns_project.dto.FileDto;
import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.entity.Board;
import com.example.sns_project.entity.Files;
import com.example.sns_project.entity.Member;
import com.example.sns_project.entity.Profile;
import com.example.sns_project.repository.FileRepository;
import com.example.sns_project.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileService {
    private final MemberRepository memberRepository;
    private final FileRepository fileRepository;

    private final AmazonS3 amazonS3;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private static String profileUrl = "/profile/";
    private static String boardUrl = "/board/";

    @Transactional
    public ResponseDto saveProfile(String username, MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.value(), "프로필이 비워져있습니다", null);
        }
        log.info("saveProfile 프로필 저장하기");
        Member member = memberRepository.findByUsername(username).get(0);
        String originalFilename = file.getOriginalFilename();
        String type = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());
        amazonS3.putObject(bucket, uuid, file.getInputStream(), metadata);
        log.info("저장 될 경로 : {}", uuid);
        Profile profile = new Profile(member, uuid, file.getName(), type, file.getSize());
        fileRepository.saveProfile(profile);
        FileDto fileDto = new FileDto(profile.getId(), uuid, file.getName(), type, file.getSize());
        return new ResponseDto(HttpStatus.OK.value(), "저장 완료", fileDto);
    }

    @Transactional
    public ResponseDto saveBoardFile(Board board, List<MultipartFile> files) throws IOException {
        for (MultipartFile file : files) {
            log.info("게시글 파일 저장 : {}", file.getName());
            String originalFilename = file.getOriginalFilename();
            String type = extractExt(originalFilename);
            String uuid = UUID.randomUUID().toString();
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            metadata.setContentType(file.getContentType());
            amazonS3.putObject(bucket, uuid, file.getInputStream(), metadata);
            log.info("저장 될 경로 : {}", uuid);
            Files data = new Files(board, uuid, file.getName(), type, file.getSize());
            fileRepository.saveBoardFile(data);
        }
        return new ResponseDto(HttpStatus.OK.value(), "저장 완료", null);
    }


    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }

    public ResponseDto getProfile(String username) {
        Profile profile = fileRepository.findProfileByUsername(username).get(0);
        FileDto fileDto = new FileDto(profile.getId(), profile.getPath(), profile.getName(), profile.getType(), profile.getSize());
        return new ResponseDto(HttpStatus.OK.value(), "프로필 저장 경로 반환", fileDto);

    }
    public ResponseDto deleteProfile(String username){
        Profile profile = fileRepository.findProfileByUsername(username).get(0);
        fileRepository.deleteProfile(profile);
        amazonS3.deleteObject(bucket, profile.getPath());
        return new ResponseDto(HttpStatus.OK.value(), "프로필 사진 삭제 완료", null);

    }
}

