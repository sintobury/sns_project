package com.example.sns_project.entity;

import com.example.sns_project.enums.FriendEnum;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Friend {
    @Id
    @Column(name = "friend_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 친구 요청한 쪽의 member_id
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id")
    private Member friendRequest;

    // 친구 요청 받는 쪽의 member_id
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requested_id")
    private Member friendRequested;

    @Enumerated(EnumType.STRING)
    private FriendEnum state;

    public Friend(Member friendRequest, Member friendRequested, FriendEnum state) {
        this.friendRequest = friendRequest;
        this.friendRequested = friendRequested;
        friendRequest.getFriendRequestList().add(this);
        friendRequested.getFriendRequestedList().add(this);
        this.state = state;
    }

    public Friend() {

    }
}
