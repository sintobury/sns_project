package com.example.sns_project.service;

import com.example.sns_project.dto.FriendDataDto;
import com.example.sns_project.dto.FriendDto;
import com.example.sns_project.dto.ResponseDto;
import com.example.sns_project.entity.Friend;
import com.example.sns_project.entity.Member;
import com.example.sns_project.enums.FriendEnum;
import com.example.sns_project.repository.FriendRepository;
import com.example.sns_project.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class FriendService {
    private final FriendRepository friendRepository;
    private final MemberRepository memberRepository;

    /**
     * 친구 추가
     */
    public ResponseDto save(FriendDataDto friendAddDto){
        Member member = memberRepository.findById(friendAddDto.getRequestId());
        Member friend = memberRepository.findById(friendAddDto.getRequestedId());
        if(member == null || friend == null){
            return new ResponseDto(HttpStatus.BAD_REQUEST.value(), "조회할 수 없는 유저를 친구추가 하셨습니다.", null);

        }
        List<Friend> friendRequest = friendRepository.findFriend(member, friend);
        List<Friend> friendRequested = friendRepository.findFriend(friend, member);
        List<Friend> joinedList = new ArrayList<>();
        joinedList.addAll(friendRequest);
        joinedList.addAll(friendRequested);
        if(joinedList.size() != 0){
            return new ResponseDto(HttpStatus.BAD_REQUEST.value(), "이미 친구 요청 혹은 친구 상태입니다.", null);
        }else{
            friendRepository.save(new Friend(member, friend, FriendEnum.WAIT));
            return new ResponseDto(HttpStatus.OK.value(), "친구 요청이 성공적으로 처리되었습니다", friendAddDto);
        }

    }
    /**
     * 나의 친구리스트를 가져오는 함수
     * 이때 친구는 서로 수락한 상태여야하므로 complete 된 친구만 가져온다.
     */

    public ResponseDto findFriendList(Long memberId){
        List<Friend> requestedFriendList = friendRepository.findRequestedFriendList(memberId);
        List<Friend> requestFriendList = friendRepository.findRequestFriendList(memberId);
        List<FriendDto> joinedList = new ArrayList<>();
        for (Friend friend : requestFriendList) {
            FriendDto friendDto = new FriendDto(friend.getId(), friend.getFriendRequest().convertDto(),true, friend.getState());
            joinedList.add(friendDto);
        }
        for (Friend friend : requestedFriendList) {
            FriendDto friendDto = new FriendDto(friend.getId(), friend.getFriendRequested().convertDto(),false, friend.getState());
            joinedList.add(friendDto);
        }
        return new ResponseDto(HttpStatus.OK.value(), "친구리스트를 성공적으로 조회했습니다.", joinedList);
    }
    /**
     * 내가 요청한 친구리스트를 가져오는 함수
     * 이때 wait 상태인 내가 요청한 친구 리스트만 가져온다.
     */
    public ResponseDto findWaitRequestFriendList(Long memberId){
        List<Friend> requestFriendWaitList = friendRepository.findRequestFriendWaitList(memberId);
        List<FriendDto> resultList = new ArrayList<>();
        for (Friend friend : requestFriendWaitList) {
            resultList.add(new FriendDto(friend.getId(), friend.getFriendRequested().convertDto(),true, friend.getState()));
        }
        return new ResponseDto(HttpStatus.OK.value(), "친구요청 대기 리스트를 성공적으로 조회했습니다.", resultList);

    }
    /**
     * 나한테 요청한 친구리스트를 가져오는 함수
     * 이때 wait 상태인 나한테 요청한 친구 리스트만 가져온다.
     */
    public ResponseDto findWaitRequestedFriendList(Long memberId){
        List<Friend> requestedFriendWaitList = friendRepository.findRequestedFriendWaitList(memberId);
        List<FriendDto> resultList = new ArrayList<>();
        for (Friend friend : requestedFriendWaitList) {
            resultList.add(new FriendDto(friend.getId(), friend.getFriendRequest().convertDto(), false, friend.getState()));
        }

        return new ResponseDto(HttpStatus.OK.value(), "친구수락 대기 리스트를 성공적으로 조회했습니다.", resultList);

    }

    /**
     * 내가 특정 친구에게 요청했는지 체크하기위한 함수
     */
    public ResponseDto checkFriendRequest(FriendDataDto friendDataDto){
        Member member = memberRepository.findById(friendDataDto.getRequestId());
        Member friend = memberRepository.findById(friendDataDto.getRequestedId());
        if(member == null || friend == null){
            return new ResponseDto(HttpStatus.BAD_REQUEST.value(), "조회할 수 없는 유저를 체크하셨습니다.", null);
        }
        List<Friend> request = friendRepository.findFriend(member, friend);
        List<Friend> requested = friendRepository.findFriend(friend, member);
        if(request.size() != 0){
            if(request.get(0).getState() == FriendEnum.WAIT){
                friendDataDto.setState("REQUEST_WAIT");
                return new ResponseDto(HttpStatus.OK.value(), "친구 요청 수락 대기중입니다.", friendDataDto);
            }else{
                friendDataDto.setState("COMPLETE");
                return new ResponseDto(HttpStatus.OK.value(), "이미 친구 상태 입니다.", friendDataDto);
            }

        }else if (requested.size() != 0){
            if(requested.get(0).getState() == FriendEnum.WAIT){
                friendDataDto.setState("REQUESTED_WAIT");
                return new ResponseDto(HttpStatus.OK.value(), "친구 요청을 받은 상태입니다.", friendDataDto);
            }else{
                friendDataDto.setState("COMPLETE");
                return new ResponseDto(HttpStatus.OK.value(), "이미 친구 상태 입니다.", friendDataDto);
            }
        }else{
            friendDataDto.setState("NONE");
            return new ResponseDto(HttpStatus.OK.value(), "친구 요청이 가능한 상태입니다", friendDataDto);
        }
    }

    public ResponseDto acceptFriendRequest(Long friendId){
        Friend friend = friendRepository.findFriendById(friendId);
        if(friend == null){
            return new ResponseDto(HttpStatus.BAD_REQUEST.value(), "검색된 friend가 없어서 수락이 불가능합니다.", null);
        }else{
            log.info("친구 수락 함수 진입");
            friend.setState(FriendEnum.COMPLETE);
            friendRepository.save(friend);
            return new ResponseDto(HttpStatus.OK.value(), "성공적으로 친구요청을 수락하였습니다.", friendId);
        }
    }
    public ResponseDto deleteFriend(FriendDto friendDto){
        try{
            Friend friend = friendRepository.findFriendById(friendDto.getId());
            friendRepository.deleteFriendById(friend);
            return new ResponseDto(HttpStatus.OK.value(), "성공적으로 친구를 삭제했습니다.", friendDto);
        }catch (Exception e){
            return new ResponseDto(HttpStatus.BAD_REQUEST.value(), e.getMessage(), friendDto);
        }
    }
}
