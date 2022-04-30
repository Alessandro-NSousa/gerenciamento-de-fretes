<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="freightSystemApp.telefone.home.createOrEditLabel"
          data-cy="TelefoneCreateUpdateHeading"
          v-text="$t('freightSystemApp.telefone.home.createOrEditLabel')"
        >
          Create or edit a Telefone
        </h2>
        <div>
          <div class="form-group" v-if="telefone.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="telefone.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.telefone.numero')" for="telefone-numero">Numero</label>
            <input
              type="text"
              class="form-control"
              name="numero"
              id="telefone-numero"
              data-cy="numero"
              :class="{ valid: !$v.telefone.numero.$invalid, invalid: $v.telefone.numero.$invalid }"
              v-model="$v.telefone.numero.$model"
              required
            />
            <div v-if="$v.telefone.numero.$anyDirty && $v.telefone.numero.$invalid">
              <small class="form-text text-danger" v-if="!$v.telefone.numero.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.telefone.cliente')" for="telefone-cliente">Cliente</label>
            <select class="form-control" id="telefone-cliente" data-cy="cliente" name="cliente" v-model="telefone.cliente">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="telefone.cliente && clienteOption.id === telefone.cliente.id ? telefone.cliente : clienteOption"
                v-for="clienteOption in clientes"
                :key="clienteOption.id"
              >
                {{ clienteOption.nome }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.telefone.motorista')" for="telefone-motorista">Motorista</label>
            <select class="form-control" id="telefone-motorista" data-cy="motorista" name="motorista" v-model="telefone.motorista">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="telefone.motorista && motoristaOption.id === telefone.motorista.id ? telefone.motorista : motoristaOption"
                v-for="motoristaOption in motoristas"
                :key="motoristaOption.id"
              >
                {{ motoristaOption.nome }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.telefone.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./telefone-update.component.ts"></script>
