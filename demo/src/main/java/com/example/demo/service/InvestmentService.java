package com.example.demo.service;

import com.example.demo.entity.Fund;
import com.example.demo.entity.Investment;
import com.example.demo.repository.FundRepo;
import com.example.demo.repository.InvestRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

        return investRepo.save(investment);
    }

    @Transactional(readOnly = true)
    public List<Investment> sortInvestments(String sortBy) {
        List<Investment> invests= new ArrayList<>();

        if (sortBy == null || sortBy.isBlank()) {
            return investRepo.findAll();
        }

        String[] parts = sortBy.split("_");

        String field = parts[0];
        String direction = parts[1];

        if (field.equals("name")) {
            if (direction.equals("asc")) {
                invests = investRepo.findAll(Sort.by(Sort.Direction.ASC, "name"));
            } else if (direction.equals("desc")) {
                invests = investRepo.findAll(Sort.by(Sort.Direction.DESC, "name"));
            }
        } else if (field.equals("amount")) {
            if (direction.equals("asc")) {
                invests = investRepo.findAll(Sort.by(Sort.Direction.ASC, "amount"));
            } else if (direction.equals("desc")) {
                invests = investRepo.findAll(Sort.by(Sort.Direction.DESC, "amount"));
            }
        }

        return invests;
    }

    @Transactional
    public void deleteInvestment(Long id) {
        Investment investment = investRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Investment not found"));

        investRepo.delete(investment);

    }
}
