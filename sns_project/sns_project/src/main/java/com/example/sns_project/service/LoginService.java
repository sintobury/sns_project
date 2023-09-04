package com.example.sns_project.service;

import com.example.sns_project.dto.LoginDto;
import com.example.sns_project.dto.RefreshDto;
import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.dto.TokenDto;
import com.example.sns_project.entity.Member;
import com.example.sns_project.repository.MemberRepository;
import com.example.sns_project.repository.RedisRepository;
import com.example.sns_project.security.auth.Jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisRepository redisRepository;
    public ResponseDto login(LoginDto loginDto){
        List<Member> searchResult = memberRepository.findByUsername(loginDto.getUsername());
        if(searchResult == null){
            return new ResponseDto(HttpStatus.BAD_REQUEST.value(), "해당되는 아이디가 없습니다.", null);
        }else if( bCryptPasswordEncoder.matches(loginDto.getPassword(), searchResult.get(0).getPassword())){
            String accessToken = jwtTokenProvider.generateAccessToken(searchResult.get(0));
            String refreshToken = jwtTokenProvider.generateRefreshToken(searchResult.get(0));
            redisRepository.saveRefreshToken(refreshToken);
            return new ResponseDto(HttpStatus.OK.value(), "정상 로그인되었습니다.", new TokenDto(accessToken, refreshToken));
        }else{
            return new ResponseDto(HttpStatus.BAD_REQUEST.value(), "비밀번호가 잘못되었습니다", null);
        }
    }
    public ResponseDto logout(RefreshDto refreshDto){
        redisRepository.deleteRefreshToken(refreshDto.getRefreshToken());
        return new ResponseDto(HttpStatus.OK.value(), "로그아웃 성공",refreshDto);
    }
}
