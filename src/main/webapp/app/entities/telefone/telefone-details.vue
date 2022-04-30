<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="telefone">
        <h2 class="jh-entity-heading" data-cy="telefoneDetailsHeading">
          <span v-text="$t('freightSystemApp.telefone.detail.title')">Telefone</span> {{ telefone.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('freightSystemApp.telefone.numero')">Numero</span>
          </dt>
          <dd>
            <span>{{ telefone.numero }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.telefone.cliente')">Cliente</span>
          </dt>
          <dd>
            <div v-if="telefone.cliente">
              <router-link :to="{ name: 'ClienteView', params: { clienteId: telefone.cliente.id } }">{{
                telefone.cliente.nome
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.telefone.motorista')">Motorista</span>
          </dt>
          <dd>
            <div v-if="telefone.motorista">
              <router-link :to="{ name: 'MotoristaView', params: { motoristaId: telefone.motorista.id } }">{{
                telefone.motorista.nome
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="telefone.id" :to="{ name: 'TelefoneEdit', params: { telefoneId: telefone.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./telefone-details.component.ts"></script>
