package com.vocab.vocabapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "words")
@Data // Lombok -> Getter, Setter, ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String en;   // English word

    @Column(nullable = false)
    private String tr;   // Turkish meaning

    @Column(nullable = false)
    private String type; // noun, verb, adjective...

    @Column(nullable = false)
    private String level; // A1, A2, B1, B2, C1
}
