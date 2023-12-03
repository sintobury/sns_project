package com.example.sns_project.Service;


import com.example.sns_project.dto.JoinDto;
import com.example.sns_project.dto.MemberDto;
import com.example.sns_project.entity.Member;
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
public class MemberServiceTest {
    @Autowired
    private MemberService memberService;
    @Autowired
    private JoinService joinService;
    @Autowired
    private EntityManager em;

    @Test
    void memberUpdateTest(){
        JoinDto joinDto = new JoinDto("test111449", "1234", "테스트", "MALE", "wldnjs3690@gmail.com", LocalDateTime.now());
        joinService.join(joinDto);
        Member member = memberService.findByUsername(joinDto.getUsername());
        MemberDto memberDto = member.convertDto();
        memberDto.setName("테스트2");
        memberService.memberUpdate(memberDto);
        em.flush();
        em.clear();
        Member member1 = memberService.findByUsername(joinDto.getUsername());
        System.out.println(member1.getName());

    }
}
