package com.example.sns_project.security.auth;


import com.example.sns_project.entity.Member;
import com.example.sns_project.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<Member> memberEntity = memberRepository.findByUsername(username);
        if(memberEntity.size() != 0){
            return new CustomDetails(memberEntity.get(0));
        }
        return null;
    }
}
