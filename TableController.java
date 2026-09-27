package com.auradining.booking.controller;

import com.auradining.booking.model.TableOverride;
import com.auradining.booking.repository.TableOverrideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tables/overrides")
@CrossOrigin(origins = "*")
public class TableController {

    @Autowired
    private TableOverrideRepository tableOverrideRepository;

    @GetMapping
    public List<TableOverride> getOverrides() {
        return tableOverrideRepository.findAll();
    }

    @PostMapping("/{id}")
    public ResponseEntity<TableOverride> toggleOverride(@PathVariable("id") Integer id) {
        Optional<TableOverride> existing = tableOverrideRepository.findById(id);
        if (existing.isPresent()) {
            tableOverrideRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            TableOverride saved = tableOverrideRepository.save(new TableOverride(id, "blocked"));
            return ResponseEntity.ok(saved);
        }
    }
}
