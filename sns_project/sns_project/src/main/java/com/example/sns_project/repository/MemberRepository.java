package com.example.sns_project.repository;

import com.example.sns_project.dto.MemberDto;
import com.example.sns_project.entity.Member;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

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
    public List<Member> findByUsername(String username){
        List<Member> resultList = em.createQuery("select m from Member m where m.username = :username", Member.class)
                .setParameter("username", username).getResultList();
        return resultList;
    }
    public List<Member> findById(Long memberId){
        return em.createQuery("select m from Member m where m.id = :memberId", Member.class)
                .setParameter("memberId", memberId).getResultList();

    }


}
