package com.example.sns_project.repository;

import com.example.sns_project.entity.Friend;
import com.example.sns_project.enums.FriendEnum;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class FriendRepository {
    private final EntityManager em;

    public void save(Friend friend){
        if(friend.getId() == null){
            em.persist(friend);
        }else{
            em.merge(friend);
        }
    }
    public List<Friend> findRequestFriendList(String memberId){
        return em.createQuery("select f from Friend f " +
                "join fetch f.friendRequest r " +
                "where r.id = :member_id and f.state = :state", Friend.class).setParameter("state", FriendEnum.COMPLETE).setParameter("member_id",memberId).getResultList();
    }
    public List<Friend> findRequestedFriendList(String memberId){
        return em.createQuery("select f from Friend f " +
                "join fetch f.friendRequested r " +
                "where r.id = :member_id and f.state = :state", Friend.class).setParameter("state", FriendEnum.COMPLETE).setParameter("member_id",memberId).getResultList();
    }
    public List<Friend> findRequestFriendWaitList(String memberId){
        return em.createQuery("select f from Friend f " +
                "join fetch f.friendRequest r " +
                "where r.id = :member_id and f.state = :state", Friend.class).setParameter("state", FriendEnum.WAIT).setParameter("member_id",memberId).getResultList();
    }
    public List<Friend> findRequestedFriendWaitList(String memberId){
        return em.createQuery("select f from Friend f " +
                "join fetch f.friendRequested r " +
                "where r.id = :member_id and f.state = :state", Friend.class).setParameter("state", FriendEnum.WAIT).setParameter("member_id",memberId).getResultList();
    }



}
