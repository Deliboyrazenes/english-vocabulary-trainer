package com.vocab.vocabapp.repository;

import com.vocab.vocabapp.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {

    Optional<Note> findByUserIdAndWordId(Long userId, Long wordId);
    List<Note> findAllByUserId(Long userId);


    @Modifying
    @Query("DELETE FROM Note n WHERE n.user.id = :userId")
    void deleteAllByUserId(Long userId);
}
