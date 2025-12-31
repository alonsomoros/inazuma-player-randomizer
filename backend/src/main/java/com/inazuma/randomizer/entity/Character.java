package com.inazuma.randomizer.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "characters")
@Data
@NoArgsConstructor
public class Character {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String nickname;
    
    @Column(name = "image_url", length = 500)
    private String imageUrl;
    
    private String gender;
    private String element;
    private String position;
    private String team;

    @Embedded
    private CharacterStats stats;

    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "how_to_obtain", columnDefinition = "TEXT")
    private String howToObtain;
    
    private String schoolYear;
    private String ageGroup;
    private String characterRole;
    
    // Additional field to track if custom or imported
    private boolean isCustom = false;
}
