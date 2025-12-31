package com.inazuma.randomizer.service;

import com.inazuma.randomizer.entity.Character;
import com.inazuma.randomizer.repository.CharacterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final CharacterRepository repository;

    public Page<Character> getCharacters(String name, String element, String position, String gender, String team, Pageable pageable) {
        Specification<Character> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.hasText(name)) {
                predicates.add(cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
            }
            if (StringUtils.hasText(element)) {
                predicates.add(cb.equal(root.get("element"), element));
            }
            if (StringUtils.hasText(position)) {
                predicates.add(cb.equal(root.get("position"), position));
            }
            if (StringUtils.hasText(gender)) {
                predicates.add(cb.equal(root.get("gender"), gender));
            }
            if (StringUtils.hasText(team)) {
                predicates.add(cb.like(cb.lower(root.get("team")), "%" + team.toLowerCase() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return repository.findAll(spec, pageable);
    }
}
