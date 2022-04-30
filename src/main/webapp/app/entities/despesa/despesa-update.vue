<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="freightSystemApp.despesa.home.createOrEditLabel"
          data-cy="DespesaCreateUpdateHeading"
          v-text="$t('freightSystemApp.despesa.home.createOrEditLabel')"
        >
          Create or edit a Despesa
        </h2>
        <div>
          <div class="form-group" v-if="despesa.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="despesa.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.despesa.tipoDespesa')" for="despesa-tipoDespesa"
              >Tipo Despesa</label
            >
            <select
              class="form-control"
              name="tipoDespesa"
              :class="{ valid: !$v.despesa.tipoDespesa.$invalid, invalid: $v.despesa.tipoDespesa.$invalid }"
              v-model="$v.despesa.tipoDespesa.$model"
              id="despesa-tipoDespesa"
              data-cy="tipoDespesa"
            >
              <option v-for="tipo in tipoValues" :key="tipo" v-bind:value="tipo" v-bind:label="$t('freightSystemApp.Tipo.' + tipo)">
                {{ tipo }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.despesa.descricao')" for="despesa-descricao">Descricao</label>
            <input
              type="text"
              class="form-control"
              name="descricao"
              id="despesa-descricao"
              data-cy="descricao"
              :class="{ valid: !$v.despesa.descricao.$invalid, invalid: $v.despesa.descricao.$invalid }"
              v-model="$v.despesa.descricao.$model"
              required
            />
            <div v-if="$v.despesa.descricao.$anyDirty && $v.despesa.descricao.$invalid">
              <small class="form-text text-danger" v-if="!$v.despesa.descricao.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.despesa.valor')" for="despesa-valor">Valor</label>
            <input
              type="number"
              class="form-control"
              name="valor"
              id="despesa-valor"
              data-cy="valor"
              :class="{ valid: !$v.despesa.valor.$invalid, invalid: $v.despesa.valor.$invalid }"
              v-model.number="$v.despesa.valor.$model"
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
            :disabled="$v.despesa.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./despesa-update.component.ts"></script>
