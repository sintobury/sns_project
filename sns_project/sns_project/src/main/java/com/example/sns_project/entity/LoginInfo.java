package com.example.sns_project.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "loginInfo", timeToLive = 604800)
public class LoginInfo {
    @Id
    private String username;
    @Indexed
    private String accessToken;
    @Indexed
    private String refreshToken;

}
