package com.companny.gerenciamento.repository;

import com.companny.gerenciamento.domain.Despesa;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Despesa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DespesaRepository extends JpaRepository<Despesa, Long> {}
