package com.example.sns_project.repository;

import com.example.sns_project.entity.Member;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberRepository {
    private final EntityManager em;

    public void save(Member member){
        if(member.getId() == null){
            em.persist(member);
        }else{
            em.merge(member);
        }
    }
    public Member findByUsername(String username){
        Member searchResult = (Member) em.createQuery("select m from Member m where m.username = username", Member.class).getSingleResult();
        return searchResult;
    }
}
