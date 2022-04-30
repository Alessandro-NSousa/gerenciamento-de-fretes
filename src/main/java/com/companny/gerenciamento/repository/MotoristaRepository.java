package com.companny.gerenciamento.repository;

import com.companny.gerenciamento.domain.Motorista;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Motorista entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MotoristaRepository extends JpaRepository<Motorista, Long> {}
