package com.example.demo.controller;

import com.example.demo.dtos.FundRequest;
import com.example.demo.entity.Fund;
import com.example.demo.service.FundService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/funds")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class FundController {

    private final FundService fundService;

    @GetMapping("/{id}")
    public ResponseEntity<Fund> getFunds(@PathVariable Long id){

        return ResponseEntity.ok().body(fundService.getById(id));
    }

    @PostMapping("/{id}/add")
    public ResponseEntity<Void> addFunds(@PathVariable Long id, @RequestBody FundRequest request){


        fundService.addFund(request.getAmount(), id);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
