package com.vocab.vocabapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(
        name = "known_words",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "word_id"})
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KnownWord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "word_id")
    private Word word;

    @Column(nullable = false, updatable = false)
    private LocalDate knownAt;


    @PrePersist
    public void prePersist() {
        if (knownAt == null) {
            knownAt = LocalDate.now();
        }
    }

}
