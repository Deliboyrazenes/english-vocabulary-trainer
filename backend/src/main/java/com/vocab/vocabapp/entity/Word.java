package com.vocab.vocabapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "words")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String en;

    @Column(nullable = false)
    private String tr;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String level;
}
