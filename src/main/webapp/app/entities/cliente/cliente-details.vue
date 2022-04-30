<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="cliente">
        <h2 class="jh-entity-heading" data-cy="clienteDetailsHeading">
          <span v-text="$t('freightSystemApp.cliente.detail.title')">Cliente</span> {{ cliente.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('freightSystemApp.cliente.nome')">Nome</span>
          </dt>
          <dd>
            <span>{{ cliente.nome }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.cliente.cnpj')">Cnpj</span>
          </dt>
          <dd>
            <span>{{ cliente.cnpj }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.cliente.endereco')">Endereco</span>
          </dt>
          <dd>
            <div v-if="cliente.endereco">
              <router-link :to="{ name: 'EnderecoView', params: { enderecoId: cliente.endereco.id } }">{{
                cliente.endereco.logradouro
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="cliente.id" :to="{ name: 'ClienteEdit', params: { clienteId: cliente.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./cliente-details.component.ts"></script>
