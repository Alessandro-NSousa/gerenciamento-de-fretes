<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="freightSystemApp.caminhao.home.createOrEditLabel"
          data-cy="CaminhaoCreateUpdateHeading"
          v-text="$t('freightSystemApp.caminhao.home.createOrEditLabel')"
        >
          Create or edit a Caminhao
        </h2>
        <div>
          <div class="form-group" v-if="caminhao.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="caminhao.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.caminhao.marca')" for="caminhao-marca">Marca</label>
            <input
              type="text"
              class="form-control"
              name="marca"
              id="caminhao-marca"
              data-cy="marca"
              :class="{ valid: !$v.caminhao.marca.$invalid, invalid: $v.caminhao.marca.$invalid }"
              v-model="$v.caminhao.marca.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.caminhao.placa')" for="caminhao-placa">Placa</label>
            <input
              type="text"
              class="form-control"
              name="placa"
              id="caminhao-placa"
              data-cy="placa"
              :class="{ valid: !$v.caminhao.placa.$invalid, invalid: $v.caminhao.placa.$invalid }"
              v-model="$v.caminhao.placa.$model"
              required
            />
            <div v-if="$v.caminhao.placa.$anyDirty && $v.caminhao.placa.$invalid">
              <small class="form-text text-danger" v-if="!$v.caminhao.placa.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.caminhao.ano')" for="caminhao-ano">Ano</label>
            <input
              type="text"
              class="form-control"
              name="ano"
              id="caminhao-ano"
              data-cy="ano"
              :class="{ valid: !$v.caminhao.ano.$invalid, invalid: $v.caminhao.ano.$invalid }"
              v-model="$v.caminhao.ano.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.caminhao.cargaTotal')" for="caminhao-cargaTotal"
              >Carga Total</label
            >
            <input
              type="number"
              class="form-control"
              name="cargaTotal"
              id="caminhao-cargaTotal"
              data-cy="cargaTotal"
              :class="{ valid: !$v.caminhao.cargaTotal.$invalid, invalid: $v.caminhao.cargaTotal.$invalid }"
              v-model.number="$v.caminhao.cargaTotal.$model"
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
            :disabled="$v.caminhao.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./caminhao-update.component.ts"></script>
