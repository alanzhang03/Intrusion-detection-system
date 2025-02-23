package com.security.ids.services;

import com.security.ids.models.Threat;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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
}
