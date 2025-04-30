package com.example.reminders_api.service;

import com.example.reminders_api.model.Reminder;
import com.example.reminders_api.model.Status;
import com.example.reminders_api.repository.ReminderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
//@RequiredArgsConstructor
public class ReminderServiceImpl implements ReminderService {

    @Autowired
    private  ReminderRepository repository;

    @Override
    public List<Reminder> findAllByUserName(String userName) {
        return repository.findAllByUserName(userName);
    }

    @Override
    public Reminder save(Reminder reminder) {
        return repository.save(reminder);
    }

    @Override
    public List<Reminder> findAllByStatus(Status status) {
        return repository.findAllByStatus(status);
    }

    @Override
    public Optional<Reminder> findById(Long id) {
        return repository.findById(id);
    }
}
