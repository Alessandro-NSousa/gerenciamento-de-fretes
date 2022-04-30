<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="viagem">
        <h2 class="jh-entity-heading" data-cy="viagemDetailsHeading">
          <span v-text="$t('freightSystemApp.viagem.detail.title')">Viagem</span> {{ viagem.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('freightSystemApp.viagem.previsaoDeEntrega')">Previsao De Entrega</span>
          </dt>
          <dd>
            <span>{{ viagem.previsaoDeEntrega }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.viagem.entregueNoPrazo')">Entregue No Prazo</span>
          </dt>
          <dd>
            <span>{{ viagem.entregueNoPrazo }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.viagem.previsaoDeRetorno')">Previsao De Retorno</span>
          </dt>
          <dd>
            <span>{{ viagem.previsaoDeRetorno }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.viagem.frete')">Frete</span>
          </dt>
          <dd>
            <div v-if="viagem.frete">
              <router-link :to="{ name: 'FreteView', params: { freteId: viagem.frete.id } }">{{ viagem.frete.data }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.viagem.despesa')">Despesa</span>
          </dt>
          <dd>
            <div v-if="viagem.despesa">
              <router-link :to="{ name: 'DespesaView', params: { despesaId: viagem.despesa.id } }">{{
                viagem.despesa.tipoDespesa
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="viagem.id" :to="{ name: 'ViagemEdit', params: { viagemId: viagem.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./viagem-details.component.ts"></script>
