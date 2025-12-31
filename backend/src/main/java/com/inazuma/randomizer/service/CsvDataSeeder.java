package com.inazuma.randomizer.service;

import com.inazuma.randomizer.entity.Character;
import com.inazuma.randomizer.entity.CharacterStats;
import com.inazuma.randomizer.repository.CharacterRepository;
import com.opencsv.CSVParser;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;


@Service
@RequiredArgsConstructor
@Slf4j
public class CsvDataSeeder {

    private final CharacterRepository repository;

    @PostConstruct
    @Transactional
    public void init() {
        if (repository.count() == 0) {
            log.info("Database empty. Seeding from characters.csv...");
            seedData();
        } else {
            log.info("Database already seeded. Skipping initialization.");
            // Optional: Add logic to force update if needed
        }
    }

    private void seedData() {
        try {
            ClassPathResource resource = new ClassPathResource("data/characters.csv");
            
            // Use CSVParser to handle semicolon separator
            CSVParser parser = new CSVParserBuilder()
                    .withSeparator(';')
                    .withIgnoreQuotations(false)
                    .build();

            // We use CSVReaderHeaderAware but we need to pass a customized reader? 
            // Actually CSVReaderHeaderAware doesn't easily support custom parser in older versions easily via constructor shorthand.
            // Converting to use CSVReaderHeaderAware with the parser manually constructed or use a map-based approach with CSVReader.
            // Let's use CSVReaderHeaderAware's Map reading capability if possible, but the constructor only takes Reader.
            // So we will manually read header and then map.
            
            try (CSVReader reader = new CSVReaderBuilder(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))
                    .withCSVParser(parser)
                    .build()) {

                String[] headers = reader.readNext(); // Read header line
                if (headers == null) return;
                
                String[] line;
                while ((line = reader.readNext()) != null) {
                    if (line.length < headers.length) continue;

                    Map<String, String> values = new HashMap<>();
                    for (int i = 0; i < headers.length && i < line.length; i++) {
                        values.put(headers[i], line[i]);
                    }

                    String name = values.get("Name(Localised)"); 
                    if (name == null || name.isBlank()) {
                        // Fallback to Romaji or Kanji if Localised is missing, or skip
                         name = values.get("Name(Romaji)");
                    }
                    if (name == null || name.isBlank()) continue;

                    Character character = new Character();
                    character.setName(name);
                    character.setNickname(values.getOrDefault("Nickname", name));
                    character.setImageUrl(values.get("Image"));
                    
                    character.setGender(getValueInsideParentesis(values.get("Gender"))); // "男 (Male)" -> "Male"
                    character.setElement(getValueInsideParentesis(values.get("Element"))); // "山 (Mountain)" -> "Mountain"
                    character.setPosition(values.getOrDefault("Position", "MF"));
                    character.setTeam(values.getOrDefault("Game", "Unknown")); // Using 'Game' column as Team/Origin for now
                    
                    // Composing description from available info since Description column is gone
                    String description = "From " + values.get("Game");
                    character.setDescription(description);
                    
                    // Mapping other fields
                    character.setCharacterRole(getValueInsideParentesis(values.get("Role"))); // "選手 (Player)" -> "Player"
                    // character.setSchoolYear(...) // Not in new CSV
                    // character.setAgeGroup(...) // Not in new CSV
                    
                    // Stats
                    CharacterStats stats = new CharacterStats();
                    stats.setKick(parseInt(values.get("Kick")));
                    stats.setControl(parseInt(values.get("Control")));
                    stats.setTechnique(parseInt(values.get("Technique")));
                    stats.setPressure(parseInt(values.get("Pressure")));
                    stats.setPhysical(parseInt(values.get("Physical")));
                    stats.setAgility(parseInt(values.get("Agility")));
                    stats.setIntelligence(parseInt(values.get("Intelligence"))); // Column 'Intelligence' exists? Yes.
                    
                    character.setStats(stats);
                    
                    repository.save(character);
                }
                log.info("Seeding completed successfully.");
            }
        } catch (Exception e) {
            log.error("Failed to seed data: ", e);
        }
    }

    private String getValueInsideParentesis(String val) {
        if (val == null) return "Unknown";
        // Format: "Kanji (English)" or just "English" or "Kanji"
        // Regex to find content inside parens
        if (val.contains("(") && val.contains(")")) {
            int start = val.indexOf("(") + 1;
            int end = val.indexOf(")");
            return val.substring(start, end).trim();
        }
        return val.trim();
    }

    private int parseInt(String val) {
        if (val == null) return 0;
        try {
            return Integer.parseInt(val.trim());
        } catch (NumberFormatException e) {
            return 0;
        }
    }
}
