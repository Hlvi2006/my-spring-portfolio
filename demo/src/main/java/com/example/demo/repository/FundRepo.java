package com.example.demo.repository;

import com.example.demo.entity.Fund;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FundRepo extends JpaRepository<Fund, Long> {
}
