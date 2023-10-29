package com.example.sns_project.repository;

import com.example.sns_project.websocket.entity.Room;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface RoomRepository extends CrudRepository<Room, String> {
    @Override
    ArrayList<Room> findAll();

    @Override
    Optional<Room> findById(String s);
}
