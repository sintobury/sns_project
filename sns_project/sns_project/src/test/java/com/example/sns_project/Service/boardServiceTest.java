package com.example.sns_project.Service;

import com.example.sns_project.service.BoardService;
import com.example.sns_project.service.FileService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class boardServiceTest {
    @Autowired
    private BoardService boardService;
    @Autowired
    private FileService fileService;
    @Test
    void commentTest(){
        fileService.deleteProfile("scn04067");
    }
}
