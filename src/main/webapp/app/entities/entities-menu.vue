<template>
  <div>
    <b-dropdown-item to="/cliente">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.cliente')">Cliente</span>
    </b-dropdown-item>
    <b-dropdown-item to="/motorista">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.motorista')">Motorista</span>
    </b-dropdown-item>
    <b-dropdown-item to="/endereco">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.endereco')">Endereco</span>
    </b-dropdown-item>
    <b-dropdown-item to="/telefone">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.telefone')">Telefone</span>
    </b-dropdown-item>
    <b-dropdown-item to="/cidade">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.cidade')">Cidade</span>
    </b-dropdown-item>
    <b-dropdown-item to="/despesa">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.despesa')">Despesa</span>
    </b-dropdown-item>
    <b-dropdown-item to="/viagem">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.viagem')">Viagem</span>
    </b-dropdown-item>
    <b-dropdown-item to="/frete">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.frete')">Frete</span>
    </b-dropdown-item>
    <b-dropdown-item to="/caminhao">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.caminhao')">Caminhao</span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>
