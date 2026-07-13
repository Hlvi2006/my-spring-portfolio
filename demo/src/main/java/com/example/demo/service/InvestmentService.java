package com.example.demo.service;

import com.example.demo.entity.Fund;
import com.example.demo.entity.Investment;
import com.example.demo.repository.FundRepo;
import com.example.demo.repository.InvestRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InvestmentService {
    private final InvestRepo investRepo;
    private final FundRepo fundRepo;

    @Transactional(readOnly = true)
    public List<Investment> getInvestments() {
        return investRepo.findAll();
    }

    @Transactional(readOnly = true)
    public Investment getInvestmentById(Long id) {
        return investRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Investment not found!"));
    }

    @Transactional
    public Investment createInvestment(Investment investment) {

        Fund fund=fundRepo.findById(1L)
                .orElseThrow(() -> new RuntimeException("Fund not found!"));

        fund.setBalance(fund.getBalance().subtract(investment.getAmount()));

        return investRepo.save(investment);
    }

    @Transactional
    public Investment updateInvestment(Long id, String name) {

        Investment investment = investRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Investment not found!"));
        investment.setName(name);

        return investment;
    }

    @Transactional(readOnly = true)
    public List<Investment> sortInvestments(String sortBy) {
        List<Investment> invests;

        if(sortBy.equals("name")) {
            invests=investRepo.findAll(Sort.by("name"));
        }
        else {
            invests=investRepo.findAll(Sort.by("amount"));
        }

        return invests;
    }
}
