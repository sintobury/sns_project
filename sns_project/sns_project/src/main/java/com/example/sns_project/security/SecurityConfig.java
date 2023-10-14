package com.example.sns_project.security;

import com.example.sns_project.security.oauth2.CustomOAuth2UserService;
import com.example.sns_project.security.oauth2.OAuth2SuccessHandler;
import com.example.sns_project.security.auth.CustomAccessDeniedHandler;
import com.example.sns_project.security.auth.CustomEntryPoint;
import com.example.sns_project.security.auth.Jwt.JwtAuthenticationFilter;
import com.example.sns_project.security.auth.Jwt.JwtExceptionFilter;
import com.example.sns_project.security.auth.Jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@Slf4j
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomEntryPoint customEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtExceptionFilter jwtExceptionFilter;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final CustomOAuth2UserService oAuth2UserService;
    @Bean
    public BCryptPasswordEncoder encodePassword() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        log.info("시큐리티 필터 동작확인");
        http
                .csrf(httpSecurityCsrfConfigurer -> httpSecurityCsrfConfigurer.disable())

                .sessionManagement(sessionManage -> sessionManage.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // 세션을 이용해서 stateful처럼 보이게 사용할 수 있는데 이 방식을 사용하지않음
                .formLogin(form -> form.disable())
                .logout(logout -> logout.disable())
                .httpBasic(httpBasic -> httpBasic.disable())
                .authorizeHttpRequests(
                        request -> request
                                .requestMatchers("/member/*").hasAnyRole("ADMIN","USER")
                                .requestMatchers("/friend/*").hasAnyRole("ADMIN","USER")
                                .anyRequest().permitAll()
                )
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(customEntryPoint)
                        .accessDeniedHandler(customAccessDeniedHandler))
                .oauth2Login(oauth -> oauth
                        .successHandler(oAuth2SuccessHandler)
                        .userInfoEndpoint(user -> user
                                .userService(oAuth2UserService))
                )

                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtExceptionFilter, JwtAuthenticationFilter.class)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()));
        return http.build();

    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
