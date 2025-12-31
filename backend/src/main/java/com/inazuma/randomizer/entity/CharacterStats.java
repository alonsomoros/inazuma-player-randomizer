package com.inazuma.randomizer.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CharacterStats {
    private int kick;
    private int control;
    private int technique;
    private int pressure;
    private int physical;
    private int agility;
    private int intelligence;
}
