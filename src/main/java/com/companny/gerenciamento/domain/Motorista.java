package com.companny.gerenciamento.domain;

import com.companny.gerenciamento.domain.enumeration.Sexo;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Motorista.
 */
@Entity
@Table(name = "motorista")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Motorista implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotNull
    @Column(name = "cnh", nullable = false)
    private String cnh;

    @Column(name = "validade_cnh")
    private LocalDate validadeCnh;

    @Enumerated(EnumType.STRING)
    @Column(name = "genero")
    private Sexo genero;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Motorista id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public Motorista nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCnh() {
        return this.cnh;
    }

    public Motorista cnh(String cnh) {
        this.setCnh(cnh);
        return this;
    }

    public void setCnh(String cnh) {
        this.cnh = cnh;
    }

    public LocalDate getValidadeCnh() {
        return this.validadeCnh;
    }

    public Motorista validadeCnh(LocalDate validadeCnh) {
        this.setValidadeCnh(validadeCnh);
        return this;
    }

    public void setValidadeCnh(LocalDate validadeCnh) {
        this.validadeCnh = validadeCnh;
    }

    public Sexo getGenero() {
        return this.genero;
    }

    public Motorista genero(Sexo genero) {
        this.setGenero(genero);
        return this;
    }

    public void setGenero(Sexo genero) {
        this.genero = genero;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Motorista)) {
            return false;
        }
        return id != null && id.equals(((Motorista) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Motorista{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", cnh='" + getCnh() + "'" +
            ", validadeCnh='" + getValidadeCnh() + "'" +
            ", genero='" + getGenero() + "'" +
            "}";
    }
}
