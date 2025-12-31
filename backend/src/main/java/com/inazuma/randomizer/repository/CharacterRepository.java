package com.inazuma.randomizer.repository;

import com.inazuma.randomizer.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Long>, JpaSpecificationExecutor<Character> {
    @Query("SELECT DISTINCT c.team FROM Character c WHERE c.team IS NOT NULL ORDER BY c.team")
    List<String> findDistinctTeams();

    List<Character> findByNameContainingIgnoreCase(String name);
}
