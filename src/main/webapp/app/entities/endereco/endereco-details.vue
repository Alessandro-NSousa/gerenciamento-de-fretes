<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="endereco">
        <h2 class="jh-entity-heading" data-cy="enderecoDetailsHeading">
          <span v-text="$t('freightSystemApp.endereco.detail.title')">Endereco</span> {{ endereco.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('freightSystemApp.endereco.cep')">Cep</span>
          </dt>
          <dd>
            <span>{{ endereco.cep }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.endereco.logradouro')">Logradouro</span>
          </dt>
          <dd>
            <span>{{ endereco.logradouro }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.endereco.complemento')">Complemento</span>
          </dt>
          <dd>
            <span>{{ endereco.complemento }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.endereco.numero')">Numero</span>
          </dt>
          <dd>
            <span>{{ endereco.numero }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="endereco.id" :to="{ name: 'EnderecoEdit', params: { enderecoId: endereco.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./endereco-details.component.ts"></script>
