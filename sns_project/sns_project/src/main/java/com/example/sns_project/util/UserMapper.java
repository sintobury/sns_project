package com.example.sns_project.util;


import com.example.sns_project.entity.Member;
import com.example.sns_project.enums.MemberRole;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;

@Component
public class UserMapper {
    public Member userMapping(Map<String, Object> attributes){
        return Member.builder()
                .role(MemberRole.ROLE_USER)
                .name((String)attributes.get("name"))
                .email((String)attributes.get("email"))
                .username((String)attributes.get("username"))
                .password((String) attributes.get("key"))
                .createAt(LocalDateTime.now())
                .provider((String)attributes.get("provider")).build();
    }
}
