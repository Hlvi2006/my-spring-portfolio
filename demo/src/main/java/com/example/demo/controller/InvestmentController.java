package com.example.demo.controller;

import com.example.demo.dtos.InvestmentNameUpdate;
import com.example.demo.entity.Investment;
import com.example.demo.service.InvestmentService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/investments")
@CrossOrigin(origins = "http://localhost:3000")
public class InvestmentController {

    private final InvestmentService investmentService;

    @GetMapping
    public List<Investment> getInvestments(@RequestParam String sort)
    {
        return investmentService.sortInvestments(sort);
    }

    @GetMapping("/{id}")
    public Investment getInvestmentById(@PathVariable Long id)
    {
        return investmentService.getInvestmentById(id);
    }

    @PostMapping
    public Investment createInvestment(@RequestBody Investment investment){
        return investmentService.createInvestment(investment);
    }

    @PatchMapping("/{id}")
    public Investment updateInvestment(@PathVariable Long id,@RequestBody InvestmentNameUpdate request){

        return  investmentService.updateInvestment(id, request.getName());
    }

    @DeleteMapping("/{id}")
    public void deleteInvestment(@PathVariable Long id){
        investmentService.deleteInvestment(id);
    }
}
