package com.example.sns_project.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RedisRepository {
    private final RedisTemplate redisTemplate;
    public void saveRefreshToken(String token){
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        setOperations.add("refreshToken",token);
    }
    public boolean checkRefreshToken(String token){
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        if(setOperations.isMember("refreshToken",token)){
            return true;
        }
        return false;
    }
    public void deleteRefreshToken(String token){
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        setOperations.remove("refreshToken",token);
    }
}
