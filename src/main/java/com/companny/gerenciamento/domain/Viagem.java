package com.companny.gerenciamento.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Viagem.
 */
@Entity
@Table(name = "viagem")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Viagem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "previsao_de_entrega")
    private LocalDate previsaoDeEntrega;

    @Column(name = "entregue_no_prazo")
    private Boolean entregueNoPrazo;

    @Column(name = "previsao_de_retorno")
    private LocalDate previsaoDeRetorno;

    @ManyToOne
    @JsonIgnoreProperties(value = { "cliente", "cidade", "motorista", "caminhao" }, allowSetters = true)
    private Frete frete;

    @ManyToOne
    private Despesa despesa;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Viagem id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getPrevisaoDeEntrega() {
        return this.previsaoDeEntrega;
    }

    public Viagem previsaoDeEntrega(LocalDate previsaoDeEntrega) {
        this.setPrevisaoDeEntrega(previsaoDeEntrega);
        return this;
    }

    public void setPrevisaoDeEntrega(LocalDate previsaoDeEntrega) {
        this.previsaoDeEntrega = previsaoDeEntrega;
    }

    public Boolean getEntregueNoPrazo() {
        return this.entregueNoPrazo;
    }

    public Viagem entregueNoPrazo(Boolean entregueNoPrazo) {
        this.setEntregueNoPrazo(entregueNoPrazo);
        return this;
    }

    public void setEntregueNoPrazo(Boolean entregueNoPrazo) {
        this.entregueNoPrazo = entregueNoPrazo;
    }

    public LocalDate getPrevisaoDeRetorno() {
        return this.previsaoDeRetorno;
    }

    public Viagem previsaoDeRetorno(LocalDate previsaoDeRetorno) {
        this.setPrevisaoDeRetorno(previsaoDeRetorno);
        return this;
    }

    public void setPrevisaoDeRetorno(LocalDate previsaoDeRetorno) {
        this.previsaoDeRetorno = previsaoDeRetorno;
    }

    public Frete getFrete() {
        return this.frete;
    }

    public void setFrete(Frete frete) {
        this.frete = frete;
    }

    public Viagem frete(Frete frete) {
        this.setFrete(frete);
        return this;
    }

    public Despesa getDespesa() {
        return this.despesa;
    }

    public void setDespesa(Despesa despesa) {
        this.despesa = despesa;
    }

    public Viagem despesa(Despesa despesa) {
        this.setDespesa(despesa);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Viagem)) {
            return false;
        }
        return id != null && id.equals(((Viagem) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Viagem{" +
            "id=" + getId() +
            ", previsaoDeEntrega='" + getPrevisaoDeEntrega() + "'" +
            ", entregueNoPrazo='" + getEntregueNoPrazo() + "'" +
            ", previsaoDeRetorno='" + getPrevisaoDeRetorno() + "'" +
            "}";
    }
}
