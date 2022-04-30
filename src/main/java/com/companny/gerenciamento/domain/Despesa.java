package com.companny.gerenciamento.domain;

import com.companny.gerenciamento.domain.enumeration.Tipo;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Despesa.
 */
@Entity
@Table(name = "despesa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Despesa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_despesa")
    private Tipo tipoDespesa;

    @NotNull
    @Column(name = "descricao", nullable = false)
    private String descricao;

    @Column(name = "valor")
    private Double valor;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Despesa id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Tipo getTipoDespesa() {
        return this.tipoDespesa;
    }

    public Despesa tipoDespesa(Tipo tipoDespesa) {
        this.setTipoDespesa(tipoDespesa);
        return this;
    }

    public void setTipoDespesa(Tipo tipoDespesa) {
        this.tipoDespesa = tipoDespesa;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public Despesa descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getValor() {
        return this.valor;
    }

    public Despesa valor(Double valor) {
        this.setValor(valor);
        return this;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Despesa)) {
            return false;
        }
        return id != null && id.equals(((Despesa) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Despesa{" +
            "id=" + getId() +
            ", tipoDespesa='" + getTipoDespesa() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", valor=" + getValor() +
            "}";
    }
}
