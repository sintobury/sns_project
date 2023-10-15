package com.example.sns_project.security.oauth2;

import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.dto.TokenDto;
import com.example.sns_project.entity.Member;
import com.example.sns_project.repository.MemberRepository;
import com.example.sns_project.security.auth.CustomDetails;
import com.example.sns_project.security.auth.Jwt.JwtTokenProvider;
import com.example.sns_project.util.UserMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;
    private final UserMapper userMapper;


    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomDetails oAuth2User = (CustomDetails) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        Member member = userMapper.userMapping(attributes);
        log.info("Principal OAuth2User : {}", oAuth2User);
        List<Member> searchResult = memberRepository.findByUsername(member.getUsername());
        if(searchResult.size() == 0){
            memberRepository.save(member);
        }
        String accessToken = jwtTokenProvider.generateAccessToken(member);
        String refreshToken = jwtTokenProvider.generateRefreshToken(member);
        ResponseDto result = new ResponseDto(HttpStatus.OK.value(), "정상 로그인되었습니다", new TokenDto(accessToken, refreshToken));
        log.info("엑세스토큰 : {}",accessToken);
        log.info("리프레시토큰 : {}",refreshToken);
        response.getWriter().write(objectMapper.writeValueAsString(result));
        response.sendRedirect("http://localhost:3000/main");
    }
}
