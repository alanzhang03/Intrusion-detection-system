package com.security.ids.services;

import com.security.ids.models.Threat;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ThreatService {
    private final List<Threat> threats = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong(1);

    public List<Threat> getAllThreats() {
        return threats;
    }

    public Threat addThreat(Threat threat) {
        threat.setId(counter.getAndIncrement());
        threats.add(threat);
        return threat;
    }

    public Threat updateThreat(Long id, Threat updatedThreat) {
        Optional<Threat> existingThreat = threats.stream()
                .filter(threat -> threat.getId().equals(id))
                .findFirst();

        if (existingThreat.isPresent()) {
            Threat threat = existingThreat.get();
            threat.setType(updatedThreat.getType());
            threat.setSeverity(updatedThreat.getSeverity());
            return threat;
        }
        return null;
    }

    public void deleteThreat(Long id) {
        threats.removeIf(threat -> threat.getId().equals(id));
    }
}
