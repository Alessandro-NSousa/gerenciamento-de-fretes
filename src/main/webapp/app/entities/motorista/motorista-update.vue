<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="freightSystemApp.motorista.home.createOrEditLabel"
          data-cy="MotoristaCreateUpdateHeading"
          v-text="$t('freightSystemApp.motorista.home.createOrEditLabel')"
        >
          Create or edit a Motorista
        </h2>
        <div>
          <div class="form-group" v-if="motorista.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="motorista.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.motorista.nome')" for="motorista-nome">Nome</label>
            <input
              type="text"
              class="form-control"
              name="nome"
              id="motorista-nome"
              data-cy="nome"
              :class="{ valid: !$v.motorista.nome.$invalid, invalid: $v.motorista.nome.$invalid }"
              v-model="$v.motorista.nome.$model"
              required
            />
            <div v-if="$v.motorista.nome.$anyDirty && $v.motorista.nome.$invalid">
              <small class="form-text text-danger" v-if="!$v.motorista.nome.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.motorista.cnh')" for="motorista-cnh">Cnh</label>
            <input
              type="text"
              class="form-control"
              name="cnh"
              id="motorista-cnh"
              data-cy="cnh"
              :class="{ valid: !$v.motorista.cnh.$invalid, invalid: $v.motorista.cnh.$invalid }"
              v-model="$v.motorista.cnh.$model"
              required
            />
            <div v-if="$v.motorista.cnh.$anyDirty && $v.motorista.cnh.$invalid">
              <small class="form-text text-danger" v-if="!$v.motorista.cnh.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.motorista.validadeCnh')" for="motorista-validadeCnh"
              >Validade Cnh</label
            >
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="motorista-validadeCnh"
                  v-model="$v.motorista.validadeCnh.$model"
                  name="validadeCnh"
                  class="form-control"
                  :locale="currentLanguage"
                  button-only
                  today-button
                  reset-button
                  close-button
                >
                </b-form-datepicker>
              </b-input-group-prepend>
              <b-form-input
                id="motorista-validadeCnh"
                data-cy="validadeCnh"
                type="text"
                class="form-control"
                name="validadeCnh"
                :class="{ valid: !$v.motorista.validadeCnh.$invalid, invalid: $v.motorista.validadeCnh.$invalid }"
                v-model="$v.motorista.validadeCnh.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.motorista.genero')" for="motorista-genero">Genero</label>
            <select
              class="form-control"
              name="genero"
              :class="{ valid: !$v.motorista.genero.$invalid, invalid: $v.motorista.genero.$invalid }"
              v-model="$v.motorista.genero.$model"
              id="motorista-genero"
              data-cy="genero"
            >
              <option v-for="sexo in sexoValues" :key="sexo" v-bind:value="sexo" v-bind:label="$t('freightSystemApp.Sexo.' + sexo)">
                {{ sexo }}
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
            :disabled="$v.motorista.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./motorista-update.component.ts"></script>
