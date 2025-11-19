package com.vocab.vocabapp.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "notes", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "word_id"})
})
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Not yazan kullanıcı
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Bu nota bağlı kelime
    @ManyToOne
    @JoinColumn(name = "word_id", nullable = false)
    private Word word;

    // Not içeriği
    @Column(columnDefinition = "TEXT")
    private String text;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
