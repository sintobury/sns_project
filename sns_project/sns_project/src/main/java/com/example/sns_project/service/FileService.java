package com.example.sns_project.service;

import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.entity.Member;
import com.example.sns_project.entity.Profile;
import com.example.sns_project.repository.FileRepository;
import com.example.sns_project.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
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
    @Transactional
    public ResponseDto saveProfile(String username, MultipartFile file) throws IOException {
        if(file.isEmpty()){
            Profile profile = fileRepository.findProfileByUsername(username).get(0);
            profile.setName(null);
            profile.setType(null);
            profile.setPath(null);
            profile.setSize(null);
            fileRepository.save(profile);
            return new ResponseDto(HttpStatus.OK.value(), "프로필을 비웠습니다" , null);
        }
        Member member = memberRepository.findByUsername(username).get(0);
        String originalFilename = file.getOriginalFilename();
        String type = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString() + "." + type;
        String path = getProfileFullPath(uuid);
        file.transferTo(new File(path));
        Profile profile = new Profile(member, path, file.getName(), type, file.getSize());
        fileRepository.save(profile);
        return new ResponseDto(HttpStatus.OK.value(), "저장 완료" , null);    }

    private String extractExt(String originalFilename){
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }
}
