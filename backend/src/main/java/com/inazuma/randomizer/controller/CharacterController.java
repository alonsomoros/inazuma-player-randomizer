package com.inazuma.randomizer.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.inazuma.randomizer.entity.Character;
import com.inazuma.randomizer.service.CharacterService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/characters")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class CharacterController {

    private final CharacterService service;

    @GetMapping
    public ResponseEntity<Page<Character>> getCharacters(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String element,
            @RequestParam(required = false) String position,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String team,
            @PageableDefault(size = 20) Pageable pageable) {
        
        return ResponseEntity.ok(service.getCharacters(name, element, position, gender, team, pageable));
    }
    
    // Para el filtro de equipos en el Frontend
    @GetMapping("/teams")
    public ResponseEntity<List<String>> getTeams() {
        return ResponseEntity.ok(service.getTeams());
    }
}
