<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="cidade">
        <h2 class="jh-entity-heading" data-cy="cidadeDetailsHeading">
          <span v-text="$t('freightSystemApp.cidade.detail.title')">Cidade</span> {{ cidade.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('freightSystemApp.cidade.nome')">Nome</span>
          </dt>
          <dd>
            <span>{{ cidade.nome }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.cidade.uf')">Uf</span>
          </dt>
          <dd>
            <span v-text="$t('freightSystemApp.Uf.' + cidade.uf)">{{ cidade.uf }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="cidade.id" :to="{ name: 'CidadeEdit', params: { cidadeId: cidade.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./cidade-details.component.ts"></script>
