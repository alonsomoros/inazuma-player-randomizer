package com.inazuma.randomizer.repository;

import com.inazuma.randomizer.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Long>, JpaSpecificationExecutor<Character> {
    // Basic search/filter methods can be added here
    List<Character> findByNameContainingIgnoreCase(String name);
}
