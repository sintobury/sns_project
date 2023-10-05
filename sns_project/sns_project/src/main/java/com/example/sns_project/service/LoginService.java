package com.example.sns_project.service;

import com.example.sns_project.dto.LoginDto;
import com.example.sns_project.dto.RefreshDto;
import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.dto.TokenDto;
import com.example.sns_project.entity.LoginInfo;
import com.example.sns_project.entity.Member;
import com.example.sns_project.repository.MemberRepository;
import com.example.sns_project.repository.RedisRepository;
import com.example.sns_project.security.auth.Jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class LoginService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisRepository redisRepository;
    public ResponseDto login(LoginDto loginDto){
        List<Member> searchResult = memberRepository.findByUsername(loginDto.getUsername());
        if(searchResult.size() == 0){
            log.info("해당되는 아이디가 없습니다");
            return new ResponseDto(HttpStatus.BAD_REQUEST.value(), "해당되는 아이디가 없습니다.", null);
        }else if( bCryptPasswordEncoder.matches(loginDto.getPassword(), searchResult.get(0).getPassword())){
            if(redisRepository.existsById(loginDto.getUsername())){
                log.info("이미 로그인 상태입니다.");
                return new ResponseDto(HttpStatus.BAD_REQUEST.value(), "이미 로그인 상태 입니다.", null);
            }else{
                String accessToken = jwtTokenProvider.generateAccessToken(searchResult.get(0));
                String refreshToken = jwtTokenProvider.generateRefreshToken(searchResult.get(0));
                log.info("생성된 access : {}  refresh : {}",accessToken, refreshToken);
                redisRepository.save(LoginInfo.builder().username(loginDto.getUsername()).accessToken(accessToken).refreshToken(refreshToken).build());
                log.info("정상 로그인 되었습니다.");
                return new ResponseDto(HttpStatus.OK.value(), "정상 로그인되었습니다.", new TokenDto(accessToken, refreshToken));
            }

        }else{
            log.info("비밀번호가 잘못되었습니다.");
            return new ResponseDto(HttpStatus.BAD_REQUEST.value(), "비밀번호가 잘못되었습니다", null);
        }
    }
    public ResponseDto logout(RefreshDto refreshDto){
        LoginInfo login = redisRepository.findByRefreshToken(refreshDto.getRefreshToken());
        redisRepository.deleteById(login.getUsername());
        return new ResponseDto(HttpStatus.OK.value(), "로그아웃 성공",refreshDto);
    }
}
