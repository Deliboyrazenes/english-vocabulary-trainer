package com.vocab.vocabapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vocab.vocabapp.entity.GlobalNote;

public interface GlobalNoteRepository extends JpaRepository<GlobalNote, Long> {

    List<GlobalNote> findByUserIdOrderByPinnedDesc(Long userId);
}
