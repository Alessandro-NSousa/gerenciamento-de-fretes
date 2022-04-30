<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="freightSystemApp.cliente.home.createOrEditLabel"
          data-cy="ClienteCreateUpdateHeading"
          v-text="$t('freightSystemApp.cliente.home.createOrEditLabel')"
        >
          Create or edit a Cliente
        </h2>
        <div>
          <div class="form-group" v-if="cliente.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="cliente.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.cliente.nome')" for="cliente-nome">Nome</label>
            <input
              type="text"
              class="form-control"
              name="nome"
              id="cliente-nome"
              data-cy="nome"
              :class="{ valid: !$v.cliente.nome.$invalid, invalid: $v.cliente.nome.$invalid }"
              v-model="$v.cliente.nome.$model"
              required
            />
            <div v-if="$v.cliente.nome.$anyDirty && $v.cliente.nome.$invalid">
              <small class="form-text text-danger" v-if="!$v.cliente.nome.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.cliente.cnpj')" for="cliente-cnpj">Cnpj</label>
            <input
              type="text"
              class="form-control"
              name="cnpj"
              id="cliente-cnpj"
              data-cy="cnpj"
              :class="{ valid: !$v.cliente.cnpj.$invalid, invalid: $v.cliente.cnpj.$invalid }"
              v-model="$v.cliente.cnpj.$model"
              required
            />
            <div v-if="$v.cliente.cnpj.$anyDirty && $v.cliente.cnpj.$invalid">
              <small class="form-text text-danger" v-if="!$v.cliente.cnpj.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.cliente.endereco')" for="cliente-endereco">Endereco</label>
            <select class="form-control" id="cliente-endereco" data-cy="endereco" name="endereco" v-model="cliente.endereco">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="cliente.endereco && enderecoOption.id === cliente.endereco.id ? cliente.endereco : enderecoOption"
                v-for="enderecoOption in enderecos"
                :key="enderecoOption.id"
              >
                {{ enderecoOption.logradouro }}
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
            :disabled="$v.cliente.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./cliente-update.component.ts"></script>
