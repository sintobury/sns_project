package com.example.sns_project.repository;

import com.example.sns_project.entity.Board;
import com.example.sns_project.entity.Profile;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BoardRepository {
    private final EntityManager em;

    public void save(Board board){
        if(board.getId() == null){
            em.persist(board);
        }else{
            em.merge(board);
        }
    }
    public List<Board> findBoardByName(String name){
        return em.createQuery("select b from Board b " +
                "join fetch b.files f " +
                "where b.member.name = :name", Board.class).setParameter("name", name).getResultList();
    }
}
