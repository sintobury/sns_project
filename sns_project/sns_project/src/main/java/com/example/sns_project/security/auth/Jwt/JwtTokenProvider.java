package com.example.sns_project.security.auth.Jwt;


import com.example.sns_project.entity.Member;
import com.example.sns_project.security.auth.CustomDetailsService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

@RequiredArgsConstructor
@Component
@Slf4j
public class JwtTokenProvider {
    private final CustomDetailsService customDetailsService;

    // 엑세스토큰 secretKey
    @Value("${jwt.accessSecret}")
    private String accessSecretKey;

    // 리프레시토큰 secretKey
    @Value("${jwt.refreshSecret}")
    private String refreshSecretKey;
    // 엑세스토큰 만료시간
    private final Long ACCESS_TOKEN_EXPIRE_TIME = 10 * 60 * 1000L;
    // 리프레시 토큰 만료시간
    private final Long REFRESH_TOKEN_EXPIRE_TIME = 30 * 60 * 1000L;

    /**
     *
     * 엑세스 토큰 : 30 * 60 * 1000L 30분
     * 리프레시 토큰 : 60 * 60 * 24 * 14 * 1000L 14일
     */
    public String generateRefreshToken(Member member){
        Date now = new Date();
        log.info("time : {}",now);
        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setHeaderParam("alg", "HS256")
                .setSubject(member.getUsername().toString())
                .setIssuedAt(now)
                .claim("name", member.getName())
                .setExpiration(new Date(now.getTime()+ REFRESH_TOKEN_EXPIRE_TIME))
                .claim("role", member.getRole().toString())
                .signWith(SignatureAlgorithm.HS256, refreshSecretKey)
                .compact();

    }
    public String generateAccessToken(Member member){
        Date now = new Date();
        log.info("time : {}",now);
        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setHeaderParam("alg", "HS256")
                .setSubject(member.getUsername().toString())
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + ACCESS_TOKEN_EXPIRE_TIME))
                .claim("name", member.getName())
                .claim("role", member.getRole().toString())
                .signWith(SignatureAlgorithm.HS256, accessSecretKey)
                .compact();

    }
    public String findUsernameByAccess(String token){
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(accessSecretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        String username = String.valueOf(claims.getSubject());
        return username;
    }
    public String findNameByAccess(String token){
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(accessSecretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        String name = String.valueOf(claims.get("name"));
        return name;
    }
    public String findUsernameByRefresh(String token){
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(refreshSecretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        String username = String.valueOf(claims.getSubject());
        return username;
    }

    public void validateAccessToken(String token){
        try{
            Jwts.parserBuilder().setSigningKey(accessSecretKey).build().parseClaimsJws(token);
        }catch (SignatureException ex){
            log.error("Invalid JWT signature");
            throw ex;
        }catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
            throw ex;
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
            throw ex;
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
            throw ex;
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
            throw ex;
        } catch (NullPointerException ex){
            log.error("JWT is empty");
            throw ex;
        }
    }
    public void validateRefreshToken(String token){
        try{
            Jwts.parserBuilder().setSigningKey(refreshSecretKey).build().parseClaimsJws(token);
        }catch (SignatureException ex){
            log.error("Invalid JWT signature");
            throw ex;
        }catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
            throw ex;
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
            throw ex;
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
            throw ex;
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
            throw ex;
        } catch (NullPointerException ex){
            log.error("JWT is empty");
            throw ex;
        }
    }

    public Authentication getAuthentication(String token) {
        UserDetails customDetails =  customDetailsService.loadUserByUsername(this.findUsernameByAccess(token));
        log.info("customDetails : {}", customDetails);
        log.info("customDetails의 권한 : {}",customDetails.getAuthorities());
        return new UsernamePasswordAuthenticationToken(customDetails,"",customDetails.getAuthorities());
    }


}
