package com.example.demo.entity;

import com.example.demo.enums.NotfStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name="notifications")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="investment_id")
    @JsonIgnore
    private Investment investment;

    private String message;

    private LocalDateTime scheduledAt;

    @Enumerated(EnumType.STRING)
    private NotfStatus messageStatus;

    @PrePersist
    public void prePersist()
    {
        scheduledAt = LocalDateTime.now().plusDays(1);

        if(messageStatus == null){
            messageStatus=NotfStatus.PENDING;
        }
    }
}
