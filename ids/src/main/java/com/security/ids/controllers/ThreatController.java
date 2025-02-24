package com.security.ids.controllers;

import com.security.ids.models.Threat;
import com.security.ids.services.ThreatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/threats")
public class ThreatController {
    private final ThreatService threatService;

    public ThreatController(ThreatService threatService) {
        this.threatService = threatService;
    }

    // Get all threats
    @GetMapping
    public List<Threat> getAllThreats() {
        return threatService.getAllThreats();
    }

    // Add a new threat
    @PostMapping
    public Threat addThreat(@RequestBody Threat threat) {
        return threatService.addThreat(threat);
    }

    @PutMapping("/{id}")
    public Threat updateThreat(@PathVariable Long id, @RequestBody Threat updatedThreat) {
        return threatService.updateThreat(id, updatedThreat);
    }

    @DeleteMapping("/{id}")
    public void deleteThreat(@PathVariable Long id) {
        threatService.deleteThreat(id);
    }
}
