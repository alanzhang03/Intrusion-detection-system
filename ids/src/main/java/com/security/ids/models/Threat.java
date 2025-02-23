package com.security.ids.models;
import jakarta.annotation.PostConstruct;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Threat {
    private Long id;
    private String type;  
    private String severity; 
    private LocalDateTime timestamp = LocalDateTime.now();  

    public Threat(String type, String severity) {
        this.type = type;
        this.severity = severity;
        this.timestamp = LocalDateTime.now();  
    }


    @PostConstruct
    public void init() {
        if (this.timestamp == null) {
            this.timestamp = LocalDateTime.now(); 
        }
    }
}
