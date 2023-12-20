package com.example.sns_project.service;

import com.example.sns_project.dto.RefreshDto;
import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.dto.TokenDto;
import com.example.sns_project.entity.LoginInfo;
import com.example.sns_project.entity.Member;
import com.example.sns_project.repository.MemberRepository;
import com.example.sns_project.repository.RedisRepository;
import com.example.sns_project.security.auth.Jwt.JwtTokenProvider;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RedisRepository redisRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    public ResponseDto refreshToken(RefreshDto refreshDto){
        if(redisRepository.existsByRefreshToken(refreshDto.getRefreshToken())){
            try{
                jwtTokenProvider.validateRefreshToken(refreshDto.getRefreshToken());
                String username = jwtTokenProvider.findUsernameByRefresh(refreshDto.getRefreshToken());
                String accessToken = jwtTokenProvider.generateAccessToken(memberRepository.findByUsername(username).get(0));
                List<Member> result = memberRepository.findByUsername(username);
                return new ResponseDto(HttpStatus.OK.value(), "토큰이 리프레시되었습니다.", new TokenDto(accessToken, refreshDto.getRefreshToken(),result.get(0).getId()));
            }catch (JwtException e){
                LoginInfo loginInfo = redisRepository.findByRefreshToken(refreshDto.getRefreshToken());
                return new ResponseDto(HttpStatus.BAD_REQUEST.value(), e.getMessage(), null);
            }
        }else{
            return new ResponseDto(HttpStatus.BAD_REQUEST.value(), "로그인 정보가 없습니다. 다시 로그인해주세요.", null);
        }
    }
}
