<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="freightSystemApp.viagem.home.createOrEditLabel"
          data-cy="ViagemCreateUpdateHeading"
          v-text="$t('freightSystemApp.viagem.home.createOrEditLabel')"
        >
          Create or edit a Viagem
        </h2>
        <div>
          <div class="form-group" v-if="viagem.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="viagem.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.viagem.previsaoDeEntrega')" for="viagem-previsaoDeEntrega"
              >Previsao De Entrega</label
            >
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="viagem-previsaoDeEntrega"
                  v-model="$v.viagem.previsaoDeEntrega.$model"
                  name="previsaoDeEntrega"
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
                id="viagem-previsaoDeEntrega"
                data-cy="previsaoDeEntrega"
                type="text"
                class="form-control"
                name="previsaoDeEntrega"
                :class="{ valid: !$v.viagem.previsaoDeEntrega.$invalid, invalid: $v.viagem.previsaoDeEntrega.$invalid }"
                v-model="$v.viagem.previsaoDeEntrega.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.viagem.entregueNoPrazo')" for="viagem-entregueNoPrazo"
              >Entregue No Prazo</label
            >
            <input
              type="checkbox"
              class="form-check"
              name="entregueNoPrazo"
              id="viagem-entregueNoPrazo"
              data-cy="entregueNoPrazo"
              :class="{ valid: !$v.viagem.entregueNoPrazo.$invalid, invalid: $v.viagem.entregueNoPrazo.$invalid }"
              v-model="$v.viagem.entregueNoPrazo.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.viagem.previsaoDeRetorno')" for="viagem-previsaoDeRetorno"
              >Previsao De Retorno</label
            >
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="viagem-previsaoDeRetorno"
                  v-model="$v.viagem.previsaoDeRetorno.$model"
                  name="previsaoDeRetorno"
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
                id="viagem-previsaoDeRetorno"
                data-cy="previsaoDeRetorno"
                type="text"
                class="form-control"
                name="previsaoDeRetorno"
                :class="{ valid: !$v.viagem.previsaoDeRetorno.$invalid, invalid: $v.viagem.previsaoDeRetorno.$invalid }"
                v-model="$v.viagem.previsaoDeRetorno.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.viagem.frete')" for="viagem-frete">Frete</label>
            <select class="form-control" id="viagem-frete" data-cy="frete" name="frete" v-model="viagem.frete">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="viagem.frete && freteOption.id === viagem.frete.id ? viagem.frete : freteOption"
                v-for="freteOption in fretes"
                :key="freteOption.id"
              >
                {{ freteOption.data }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.viagem.despesa')" for="viagem-despesa">Despesa</label>
            <select class="form-control" id="viagem-despesa" data-cy="despesa" name="despesa" v-model="viagem.despesa">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="viagem.despesa && despesaOption.id === viagem.despesa.id ? viagem.despesa : despesaOption"
                v-for="despesaOption in despesas"
                :key="despesaOption.id"
              >
                {{ despesaOption.tipoDespesa }}
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
            :disabled="$v.viagem.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./viagem-update.component.ts"></script>
