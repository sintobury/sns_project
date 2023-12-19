package com.example.sns_project.repository;

import com.example.sns_project.entity.Board;
import com.example.sns_project.entity.Comment;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CommentRepository {
    private final EntityManager em;
    public void save(Comment comment){
        if(comment.getId() == null){
            em.persist(comment);
        }else{
            em.merge(comment);
        }
    }
    public void delete(Comment comment){
        em.remove(comment);
    }
    public Comment findById(Long commentId){
        return em.find(Comment.class, commentId);
    }
}
