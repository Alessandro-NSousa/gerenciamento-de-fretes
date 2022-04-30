package com.companny.gerenciamento.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Frete.
 */
@Entity
@Table(name = "frete")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Frete implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "data")
    private LocalDate data;

    @Column(name = "prazo_de_entrega")
    private Integer prazoDeEntrega;

    @Column(name = "valor")
    private Double valor;

    @ManyToOne
    @JsonIgnoreProperties(value = { "endereco" }, allowSetters = true)
    private Cliente cliente;

    @ManyToOne
    private Cidade cidade;

    @ManyToOne
    private Motorista motorista;

    @ManyToOne
    private Caminhao caminhao;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Frete id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return this.data;
    }

    public Frete data(LocalDate data) {
        this.setData(data);
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Integer getPrazoDeEntrega() {
        return this.prazoDeEntrega;
    }

    public Frete prazoDeEntrega(Integer prazoDeEntrega) {
        this.setPrazoDeEntrega(prazoDeEntrega);
        return this;
    }

    public void setPrazoDeEntrega(Integer prazoDeEntrega) {
        this.prazoDeEntrega = prazoDeEntrega;
    }

    public Double getValor() {
        return this.valor;
    }

    public Frete valor(Double valor) {
        this.setValor(valor);
        return this;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Cliente getCliente() {
        return this.cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Frete cliente(Cliente cliente) {
        this.setCliente(cliente);
        return this;
    }

    public Cidade getCidade() {
        return this.cidade;
    }

    public void setCidade(Cidade cidade) {
        this.cidade = cidade;
    }

    public Frete cidade(Cidade cidade) {
        this.setCidade(cidade);
        return this;
    }

    public Motorista getMotorista() {
        return this.motorista;
    }

    public void setMotorista(Motorista motorista) {
        this.motorista = motorista;
    }

    public Frete motorista(Motorista motorista) {
        this.setMotorista(motorista);
        return this;
    }

    public Caminhao getCaminhao() {
        return this.caminhao;
    }

    public void setCaminhao(Caminhao caminhao) {
        this.caminhao = caminhao;
    }

    public Frete caminhao(Caminhao caminhao) {
        this.setCaminhao(caminhao);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Frete)) {
            return false;
        }
        return id != null && id.equals(((Frete) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Frete{" +
            "id=" + getId() +
            ", data='" + getData() + "'" +
            ", prazoDeEntrega=" + getPrazoDeEntrega() +
            ", valor=" + getValor() +
            "}";
    }
}
