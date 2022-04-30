<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="frete">
        <h2 class="jh-entity-heading" data-cy="freteDetailsHeading">
          <span v-text="$t('freightSystemApp.frete.detail.title')">Frete</span> {{ frete.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('freightSystemApp.frete.data')">Data</span>
          </dt>
          <dd>
            <span>{{ frete.data }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.frete.prazoDeEntrega')">Prazo De Entrega</span>
          </dt>
          <dd>
            <span>{{ frete.prazoDeEntrega }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.frete.valor')">Valor</span>
          </dt>
          <dd>
            <span>{{ frete.valor }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.frete.cliente')">Cliente</span>
          </dt>
          <dd>
            <div v-if="frete.cliente">
              <router-link :to="{ name: 'ClienteView', params: { clienteId: frete.cliente.id } }">{{ frete.cliente.nome }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.frete.cidade')">Cidade</span>
          </dt>
          <dd>
            <div v-if="frete.cidade">
              <router-link :to="{ name: 'CidadeView', params: { cidadeId: frete.cidade.id } }">{{ frete.cidade.nome }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.frete.motorista')">Motorista</span>
          </dt>
          <dd>
            <div v-if="frete.motorista">
              <router-link :to="{ name: 'MotoristaView', params: { motoristaId: frete.motorista.id } }">{{
                frete.motorista.nome
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.frete.caminhao')">Caminhao</span>
          </dt>
          <dd>
            <div v-if="frete.caminhao">
              <router-link :to="{ name: 'CaminhaoView', params: { caminhaoId: frete.caminhao.id } }">{{
                frete.caminhao.placa
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="frete.id" :to="{ name: 'FreteEdit', params: { freteId: frete.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./frete-details.component.ts"></script>
