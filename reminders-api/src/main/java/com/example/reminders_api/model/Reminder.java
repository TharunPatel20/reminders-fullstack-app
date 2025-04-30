package com.example.reminders_api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
//import org.springframework.data.mongodb.core.mapping.Document;
//import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;

//@Document("reminders")
//@Getter
//@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
//@Builder
public class Reminder {

//    @MongoId
    @Id
    @GeneratedValue( strategy= GenerationType.IDENTITY)
    private Long id;

    private String text;

    private String userName;

    private LocalDate remindOn;

    private boolean remindMe;

    private Status status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public LocalDate getRemindOn() {
        return remindOn;
    }

    public void setRemindOn(LocalDate remindOn) {
        this.remindOn = remindOn;
    }

    public boolean isRemindMe() {
        return remindMe;
    }

    public void setRemindMe(boolean remindMe) {
        this.remindMe = remindMe;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
