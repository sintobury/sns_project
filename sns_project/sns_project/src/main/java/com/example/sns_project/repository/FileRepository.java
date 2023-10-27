package com.example.sns_project.repository;

import com.example.sns_project.entity.Member;
import com.example.sns_project.entity.Profile;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
@RequiredArgsConstructor
public class FileRepository {
    private final EntityManager em;

    public void save(Profile profile){
        if(profile.getId() == null){
            em.persist(profile);
        }else{
            em.merge(profile);
        }
    }
    public List<Profile> findProfileByUsername(String username){
        List<Profile> resultList = em.createQuery("select p from Profile p where p.member.username = :username", Profile.class)
                .setParameter("username", username).getResultList();
        return resultList;
    }
}
