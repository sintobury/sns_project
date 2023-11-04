package com.example.sns_project.repository;

import com.example.sns_project.entity.LoginInfo;
import com.mysql.cj.log.Log;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RedisRepository extends CrudRepository<LoginInfo, String > {
    boolean existsByRefreshToken(String s);
    boolean existsByUsername(String s);
    LoginInfo findByRefreshToken(String s);

}
