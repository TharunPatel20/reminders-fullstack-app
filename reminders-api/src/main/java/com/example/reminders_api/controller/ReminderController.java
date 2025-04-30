package com.example.reminders_api.controller;

import com.example.reminders_api.dto.ReminderResponse;
import com.example.reminders_api.model.Reminder;
import com.example.reminders_api.model.Status;
import com.example.reminders_api.service.ReminderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/reminders")
@CrossOrigin("http://localhost:5173")
//@RequiredArgsConstructor
public class ReminderController {
@Autowired
    private  ReminderService service;

    // GET /api/reminders?userName=
    @GetMapping("/u")
    public ResponseEntity<ReminderResponse> getAllRemindersByUser(@RequestParam String userName) {
        var reminders = service.findAllByUserName(userName);
        if (reminders.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ReminderResponse(HttpStatus.NO_CONTENT, reminders));
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ReminderResponse(HttpStatus.OK, reminders));
    }

    // GET /api/reminders?status=....
    @GetMapping("/s/")
    public ResponseEntity<ReminderResponse> getAllRemindersByUser(@RequestParam Status status) {
        var reminders = service.findAllByStatus(status);
        if (reminders.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ReminderResponse(HttpStatus.NO_CONTENT, reminders));
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ReminderResponse(HttpStatus.OK, reminders));
    }


    @PostMapping
    public ResponseEntity<ReminderResponse> createReminder(@Valid @RequestBody ReminderRequestDto request,@RequestHeader String username) {
        var reminder =new  Reminder();
        reminder.setRemindMe(request.remindMe());
        reminder.setText(request.text());
        reminder.setStatus(Status.PENDING);
        reminder.setRemindOn(request.remindOn());
        reminder.setUserName(username);

        reminder = service.save(reminder);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ReminderResponse(HttpStatus.CREATED, reminder));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReminderResponse> updateReminder(@PathVariable Long id ) {
        Optional<Reminder> reminder = service.findById(id);
        if(reminder.isPresent()){
            reminder.get().setStatus(Status.COMPLETE);
            service.save(reminder.get());
            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body(new ReminderResponse(HttpStatus.ACCEPTED, reminder));
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ReminderResponse(HttpStatus.INTERNAL_SERVER_ERROR, reminder));
    }


    @PutMapping("/{id}")

    public ResponseEntity<ReminderResponse> deleteReminder(@PathVariable Long id ) {
        Optional<Reminder> reminder = service.findById(id);
        if(reminder.isPresent()){

            service.deleteById(id);
            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body(new ReminderResponse(HttpStatus.ACCEPTED, reminder));
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ReminderResponse(HttpStatus.INTERNAL_SERVER_ERROR, reminder));
    }

}
