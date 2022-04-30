<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="freightSystemApp.endereco.home.createOrEditLabel"
          data-cy="EnderecoCreateUpdateHeading"
          v-text="$t('freightSystemApp.endereco.home.createOrEditLabel')"
        >
          Create or edit a Endereco
        </h2>
        <div>
          <div class="form-group" v-if="endereco.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="endereco.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.endereco.cep')" for="endereco-cep">Cep</label>
            <input
              type="text"
              class="form-control"
              name="cep"
              id="endereco-cep"
              data-cy="cep"
              :class="{ valid: !$v.endereco.cep.$invalid, invalid: $v.endereco.cep.$invalid }"
              v-model="$v.endereco.cep.$model"
              required
            />
            <div v-if="$v.endereco.cep.$anyDirty && $v.endereco.cep.$invalid">
              <small class="form-text text-danger" v-if="!$v.endereco.cep.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.endereco.logradouro')" for="endereco-logradouro"
              >Logradouro</label
            >
            <input
              type="text"
              class="form-control"
              name="logradouro"
              id="endereco-logradouro"
              data-cy="logradouro"
              :class="{ valid: !$v.endereco.logradouro.$invalid, invalid: $v.endereco.logradouro.$invalid }"
              v-model="$v.endereco.logradouro.$model"
              required
            />
            <div v-if="$v.endereco.logradouro.$anyDirty && $v.endereco.logradouro.$invalid">
              <small class="form-text text-danger" v-if="!$v.endereco.logradouro.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.endereco.complemento')" for="endereco-complemento"
              >Complemento</label
            >
            <input
              type="text"
              class="form-control"
              name="complemento"
              id="endereco-complemento"
              data-cy="complemento"
              :class="{ valid: !$v.endereco.complemento.$invalid, invalid: $v.endereco.complemento.$invalid }"
              v-model="$v.endereco.complemento.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.endereco.numero')" for="endereco-numero">Numero</label>
            <input
              type="number"
              class="form-control"
              name="numero"
              id="endereco-numero"
              data-cy="numero"
              :class="{ valid: !$v.endereco.numero.$invalid, invalid: $v.endereco.numero.$invalid }"
              v-model.number="$v.endereco.numero.$model"
            />
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
            :disabled="$v.endereco.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./endereco-update.component.ts"></script>
