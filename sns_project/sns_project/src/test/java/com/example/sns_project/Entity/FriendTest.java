package com.example.sns_project.Entity;

import com.example.sns_project.entity.Friend;
import com.example.sns_project.entity.Member;
import com.example.sns_project.enums.FriendEnum;
import com.example.sns_project.enums.Gender;
import com.example.sns_project.enums.MemberRole;
import com.example.sns_project.repository.FriendRepository;
import com.example.sns_project.repository.MemberRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
@Transactional
public class FriendTest {
    @Autowired
    private FriendRepository friendRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private EntityManager em;

    @Test
    void FriendTest(){
        Member member = new Member("wldnjs3690","1234","정지원","1234@gmail.com", LocalDateTime.now(),"origin","MALE", MemberRole.ROLE_USER);
        Member member2 = new Member("wldnjs77","1234","정지원","1234@gmail.com", LocalDateTime.now(),"origin","MALE", MemberRole.ROLE_USER);
        memberRepository.save(member);
        memberRepository.save(member2);
        Friend friend = new Friend(member, member2, FriendEnum.WAIT);
        friendRepository.save(friend);
    }

    @Test
    void FriendGetTest(){
        Member member = new Member("wldnjs3690","1234","정지원","1234@gmail.com", LocalDateTime.now(),"origin","MALE", MemberRole.ROLE_USER);
        Member member2 = new Member("wldnjs77","1234","정지원","1234@gmail.com", LocalDateTime.now(),"origin","MALE", MemberRole.ROLE_USER);
        Member member3 = new Member("wldnjs","1234","정지원","1234@gmail.com", LocalDateTime.now(),"origin","MALE", MemberRole.ROLE_USER);
        memberRepository.save(member);
        memberRepository.save(member2);
        memberRepository.save(member3);
        Friend friend = new Friend(member, member2, FriendEnum.COMPLETE);
        Friend friend1 = new Friend(member, member3, FriendEnum.COMPLETE);
        friendRepository.save(friend);
        friendRepository.save(friend1);
        em.flush();
        em.clear();
        List<Friend> friendList = friendRepository.findRequestFriendList("1");
        System.out.println(friendList.get(0).getFriendRequest().getUsername());
    }
}
