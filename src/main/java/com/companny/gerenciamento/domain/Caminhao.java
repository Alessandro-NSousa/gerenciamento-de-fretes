package com.companny.gerenciamento.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Caminhao.
 */
@Entity
@Table(name = "caminhao")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Caminhao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "marca")
    private String marca;

    @NotNull
    @Column(name = "placa", nullable = false)
    private String placa;

    @Column(name = "ano")
    private String ano;

    @Column(name = "carga_total")
    private Double cargaTotal;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Caminhao id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarca() {
        return this.marca;
    }

    public Caminhao marca(String marca) {
        this.setMarca(marca);
        return this;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getPlaca() {
        return this.placa;
    }

    public Caminhao placa(String placa) {
        this.setPlaca(placa);
        return this;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getAno() {
        return this.ano;
    }

    public Caminhao ano(String ano) {
        this.setAno(ano);
        return this;
    }

    public void setAno(String ano) {
        this.ano = ano;
    }

    public Double getCargaTotal() {
        return this.cargaTotal;
    }

    public Caminhao cargaTotal(Double cargaTotal) {
        this.setCargaTotal(cargaTotal);
        return this;
    }

    public void setCargaTotal(Double cargaTotal) {
        this.cargaTotal = cargaTotal;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Caminhao)) {
            return false;
        }
        return id != null && id.equals(((Caminhao) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Caminhao{" +
            "id=" + getId() +
            ", marca='" + getMarca() + "'" +
            ", placa='" + getPlaca() + "'" +
            ", ano='" + getAno() + "'" +
            ", cargaTotal=" + getCargaTotal() +
            "}";
    }
}
