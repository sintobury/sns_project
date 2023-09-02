package com.example.sns_project.Entity;

import com.example.sns_project.entity.Member;
import com.example.sns_project.enums.Gender;
import com.example.sns_project.enums.MemberRole;
import com.example.sns_project.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@SpringBootTest
@Transactional
public class MemberTest {
    @Autowired
    private MemberRepository memberRepository;

    @Test
    void MemberTest(){
        Member member = new Member("wldnjs3690","1234","정지원","1234@gmail.com", LocalDateTime.now(),"origin","MALE", MemberRole.ROLE_USER);
        memberRepository.save(member);


    }
}
