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

    @GetMapping
    public List<Threat> getAllThreats() {
        return threatService.getAllThreats();
    }

    @PostMapping
    public Threat addThreat(@RequestBody Threat threat) {
        return threatService.addThreat(threat);
    }
}
