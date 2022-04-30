<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="despesa">
        <h2 class="jh-entity-heading" data-cy="despesaDetailsHeading">
          <span v-text="$t('freightSystemApp.despesa.detail.title')">Despesa</span> {{ despesa.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('freightSystemApp.despesa.tipoDespesa')">Tipo Despesa</span>
          </dt>
          <dd>
            <span v-text="$t('freightSystemApp.Tipo.' + despesa.tipoDespesa)">{{ despesa.tipoDespesa }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.despesa.descricao')">Descricao</span>
          </dt>
          <dd>
            <span>{{ despesa.descricao }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.despesa.valor')">Valor</span>
          </dt>
          <dd>
            <span>{{ despesa.valor }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="despesa.id" :to="{ name: 'DespesaEdit', params: { despesaId: despesa.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./despesa-details.component.ts"></script>
