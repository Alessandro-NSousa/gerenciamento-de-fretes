<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="motorista">
        <h2 class="jh-entity-heading" data-cy="motoristaDetailsHeading">
          <span v-text="$t('freightSystemApp.motorista.detail.title')">Motorista</span> {{ motorista.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('freightSystemApp.motorista.nome')">Nome</span>
          </dt>
          <dd>
            <span>{{ motorista.nome }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.motorista.cnh')">Cnh</span>
          </dt>
          <dd>
            <span>{{ motorista.cnh }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.motorista.validadeCnh')">Validade Cnh</span>
          </dt>
          <dd>
            <span>{{ motorista.validadeCnh }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.motorista.genero')">Genero</span>
          </dt>
          <dd>
            <span v-text="$t('freightSystemApp.Sexo.' + motorista.genero)">{{ motorista.genero }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="motorista.id"
          :to="{ name: 'MotoristaEdit', params: { motoristaId: motorista.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./motorista-details.component.ts"></script>
