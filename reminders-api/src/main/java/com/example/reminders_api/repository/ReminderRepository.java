package com.example.reminders_api.repository;

import com.example.reminders_api.model.Reminder;
import com.example.reminders_api.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {

    List<Reminder> findAllByUserName(String userName);

    List<Reminder> findAllByStatus(Status status);
}
