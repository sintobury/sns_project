package com.example.sns_project.Entity;

import com.example.sns_project.dto.JoinDto;
import com.example.sns_project.dto.MemberDto;
import com.example.sns_project.entity.Member;
import com.example.sns_project.enums.Gender;
import com.example.sns_project.enums.MemberRole;
import com.example.sns_project.repository.MemberRepository;
import com.example.sns_project.service.JoinService;
import com.example.sns_project.service.MemberService;
import jakarta.persistence.EntityManager;
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
    @Autowired
    private MemberService memberService;
    @Autowired
    private EntityManager em;
    @Autowired
    private JoinService joinService;

    @Test
    void MemberTest(){
        Member member = new Member("wldnjs3690","1234","정지원","1234@gmail.com", LocalDateTime.now(),"origin","MALE",LocalDateTime.now(), MemberRole.ROLE_USER);
        memberRepository.save(member);
        String message = joinService.validateUsername(new JoinDto("wldnjs3690", "1234", "정지원", "MALE", "1234@gamil.com", LocalDateTime.now())).getMessage();
        System.out.println(message);


    }
}
