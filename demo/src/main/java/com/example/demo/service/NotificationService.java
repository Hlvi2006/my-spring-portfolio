package com.example.demo.service;

import com.example.demo.entity.Notification;
import com.example.demo.enums.NotfStatus;
import com.example.demo.repository.NotificationRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepo notificationRepo;

    @Transactional(readOnly = true)
    public List<Notification> getAll(){
        return notificationRepo.findAll();
    }

    @Transactional
    public void updateStatus(Long id){
        Notification notification = notificationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setMessageStatus(NotfStatus.SENT);

        notificationRepo.save(notification);
    }
}
