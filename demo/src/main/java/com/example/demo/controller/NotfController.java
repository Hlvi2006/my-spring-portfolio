package com.example.demo.controller;

import com.example.demo.entity.Notification;
import com.example.demo.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class NotfController {
    private final NotificationService notificationService;

    @GetMapping
    public List<Notification>  getNotifications()
    {
        return notificationService.getAll();
    }

    @PatchMapping("/{id}/read")
    public void updateNotifications(@PathVariable Long id){
         notificationService.updateStatus(id);
    }
}
