<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="freightSystemApp.cidade.home.createOrEditLabel"
          data-cy="CidadeCreateUpdateHeading"
          v-text="$t('freightSystemApp.cidade.home.createOrEditLabel')"
        >
          Create or edit a Cidade
        </h2>
        <div>
          <div class="form-group" v-if="cidade.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="cidade.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.cidade.nome')" for="cidade-nome">Nome</label>
            <input
              type="text"
              class="form-control"
              name="nome"
              id="cidade-nome"
              data-cy="nome"
              :class="{ valid: !$v.cidade.nome.$invalid, invalid: $v.cidade.nome.$invalid }"
              v-model="$v.cidade.nome.$model"
              required
            />
            <div v-if="$v.cidade.nome.$anyDirty && $v.cidade.nome.$invalid">
              <small class="form-text text-danger" v-if="!$v.cidade.nome.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.cidade.uf')" for="cidade-uf">Uf</label>
            <select
              class="form-control"
              name="uf"
              :class="{ valid: !$v.cidade.uf.$invalid, invalid: $v.cidade.uf.$invalid }"
              v-model="$v.cidade.uf.$model"
              id="cidade-uf"
              data-cy="uf"
            >
              <option v-for="uf in ufValues" :key="uf" v-bind:value="uf" v-bind:label="$t('freightSystemApp.Uf.' + uf)">{{ uf }}</option>
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
            :disabled="$v.cidade.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./cidade-update.component.ts"></script>
