package com.example.demo.dataSeeder;


import com.example.demo.entity.Fund;
import com.example.demo.entity.Investment;
import com.example.demo.entity.Notification;
import com.example.demo.enums.NotfStatus;
import com.example.demo.repository.FundRepo;
import com.example.demo.repository.InvestRepo;
import com.example.demo.repository.NotificationRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final FundRepo fundRepository;
    private final InvestRepo investmentRepository;
    private final NotificationRepo notificationRepository;

    @Override
    public void run(String... args) {

        if (fundRepository.count() > 0) {
            return;
        }

        Fund fund = new Fund();
        fund.setName("Growth Fund");
        fund.setBalance(new BigDecimal("10000"));

        fund = fundRepository.save(fund);

        Investment investment1 = new Investment();
        investment1.setName("Apple");
        investment1.setAmount(new BigDecimal("2500"));
        investment1.setFund(fund);

        Investment investment2 = new Investment();
        investment2.setName("Microsoft");
        investment2.setAmount(new BigDecimal("3000"));
        investment2.setFund(fund);

//        investment1 = investmentRepository.save(investment1);
//        investment2 = investmentRepository.save(investment2);

        Notification notification1 = new Notification();
        notification1.setInvestment(investment1);
        notification1.setMessage("Apple investment created.");
        notification1.setScheduledAt(LocalDateTime.now().plusDays(1));
        notification1.setMessageStatus(NotfStatus.PENDING);

        Notification notification2 = new Notification();
        notification2.setInvestment(investment2);
        notification2.setMessage("Microsoft investment created.");
        notification2.setScheduledAt(LocalDateTime.now().plusDays(1));
        notification2.setMessageStatus(NotfStatus.PENDING);

//        notificationRepository.save(notification1);
//        notificationRepository.save(notification2);
    }
}
