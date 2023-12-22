package com.example.sns_project.repository;

import com.example.sns_project.entity.Files;
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

    public void saveProfile(Profile profile){
        if(profile.getId() == null){
            em.persist(profile);
        }else{
            em.merge(profile);
        }
    }
    public void saveBoardFile(Files files){
        if(files.getId() == null){
            em.persist(files);
        }else{
            em.merge(files);
        }
    }
    public List<Profile> findProfileByUsername(String username){
        List<Profile> resultList = em.createQuery("select p from Profile p where p.member.username = :username", Profile.class)
                .setParameter("username", username).getResultList();
        return resultList;
    }
    public List<Files> findByBoardId(String boardId){
        List<Files> resultList = em.createQuery("select f from Files f where f.board.id = :boardId", Files.class)
                .setParameter("boardId", boardId).getResultList();
        return resultList;
    }
    public void deleteFiles(Files files){
        em.remove(files);
    }

    public Profile findProfile(Long id){
        return em.find(Profile.class, id);
    }

    public void deleteProfile(Profile profile){
        em.remove(profile);
    }
}
