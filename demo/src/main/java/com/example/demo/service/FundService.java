package com.example.demo.service;

import com.example.demo.entity.Fund;
import com.example.demo.repository.FundRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FundService {
    private final FundRepo fundRepo;

    @Transactional(readOnly = true)
    public Fund getById(Long id){
        return fundRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Fund not found"));
    }

    @Transactional
    public void addFund(BigDecimal amount, Long id){
        Fund fund = fundRepo.findById(id).orElseThrow(() -> new RuntimeException("Fund not found"));

        fund.setBalance(fund.getBalance().add(amount));
        fundRepo.save(fund);
    }
}
