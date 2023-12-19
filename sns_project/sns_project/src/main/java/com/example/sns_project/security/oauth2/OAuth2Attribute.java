package com.example.sns_project.security.oauth2;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.HashMap;
import java.util.Map;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@ToString
public class OAuth2Attribute {
    private Map<String, Object> attributes;  // 사용자 속성 정보를 담는 Map
    private String attributeKey;  // 사용자 속성 정보를 담는 Map
    private String provider; // 제공자 정보
    private String email; // 이메일 정보
    private String name; // 이름 정보
    private String picture;

    static OAuth2Attribute of(String provider, String attributeKey,
                              Map<String, Object> attributes){
        switch (provider){
            case "google":
                return ofGoogle(attributeKey, attributes);
//          case "kakao":
//              return;
//          case "naver":
//              return;
            default:
                throw new RuntimeException();
        }
    }
    static private OAuth2Attribute ofGoogle(String attributeKey,
                                    Map<String, Object> attributes){
        return OAuth2Attribute.builder()
                .provider("google")
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
                .attributes(attributes)
                .attributeKey(attributeKey)
                .build();
    }
    public Map<String, Object> convertToMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("username", provider + "_" + attributes.get(attributeKey));
        map.put("key", attributes.get(attributeKey));
        map.put("name", name);
        map.put("provider", provider);
        map.put("email", email);
        map.put("picture", picture);
        return map;
    }

}
