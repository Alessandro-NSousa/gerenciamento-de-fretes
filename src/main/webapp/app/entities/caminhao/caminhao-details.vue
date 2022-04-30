<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="caminhao">
        <h2 class="jh-entity-heading" data-cy="caminhaoDetailsHeading">
          <span v-text="$t('freightSystemApp.caminhao.detail.title')">Caminhao</span> {{ caminhao.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('freightSystemApp.caminhao.marca')">Marca</span>
          </dt>
          <dd>
            <span>{{ caminhao.marca }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.caminhao.placa')">Placa</span>
          </dt>
          <dd>
            <span>{{ caminhao.placa }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.caminhao.ano')">Ano</span>
          </dt>
          <dd>
            <span>{{ caminhao.ano }}</span>
          </dd>
          <dt>
            <span v-text="$t('freightSystemApp.caminhao.cargaTotal')">Carga Total</span>
          </dt>
          <dd>
            <span>{{ caminhao.cargaTotal }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="caminhao.id" :to="{ name: 'CaminhaoEdit', params: { caminhaoId: caminhao.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./caminhao-details.component.ts"></script>
