package com.vocab.vocabapp.repository;

import com.vocab.vocabapp.entity.KnownWord;
import com.vocab.vocabapp.entity.User;
import com.vocab.vocabapp.entity.Word;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface KnownWordRepository extends JpaRepository<KnownWord, Long> {

    List<KnownWord> findByUserId(Long userId);
    Optional<KnownWord> findByUserAndWord(User user, Word word);
    boolean existsByUserIdAndWordId(Long userId, Long wordId);

    @Query("SELECT COUNT(kw) FROM KnownWord kw WHERE kw.user.id = :userId")
    long countByUserId(@Param("userId") Long userId);

    // Level bazlı istatistik
    @Query("""
        SELECT w.level, COUNT(w)
        FROM KnownWord kw
        JOIN kw.word w
        WHERE kw.user.id = :userId
        GROUP BY w.level
    """)
    List<Object[]> countKnownByLevel(@Param("userId") Long userId);

    // Tür bazlı istatistik
    @Query("""
        SELECT w.type, COUNT(w)
        FROM KnownWord kw
        JOIN kw.word w
        WHERE kw.user.id = :userId
        GROUP BY w.type
    """)
    List<Object[]> countKnownByType(@Param("userId") Long userId);


    @Query("""
    SELECT kw.knownAt, COUNT(kw)
    FROM KnownWord kw
    WHERE kw.user.id = :userId
      AND kw.knownAt BETWEEN :startDate AND :endDate
    GROUP BY kw.knownAt
    ORDER BY kw.knownAt
""")
    List<Object[]> weeklyActivity(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    long countByUserIdAndKnownAt(Long userId, LocalDate date);

    long countByUserIdAndKnownAtBetween(Long userId, LocalDate start, LocalDate end);


    @Modifying
    @Transactional
    @Query("DELETE FROM KnownWord kw WHERE kw.user.id = :userId")
    void deleteByUserId(@Param("userId") Long userId);



}
