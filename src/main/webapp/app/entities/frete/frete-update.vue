<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="freightSystemApp.frete.home.createOrEditLabel"
          data-cy="FreteCreateUpdateHeading"
          v-text="$t('freightSystemApp.frete.home.createOrEditLabel')"
        >
          Create or edit a Frete
        </h2>
        <div>
          <div class="form-group" v-if="frete.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="frete.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.frete.data')" for="frete-data">Data</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="frete-data"
                  v-model="$v.frete.data.$model"
                  name="data"
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
                id="frete-data"
                data-cy="data"
                type="text"
                class="form-control"
                name="data"
                :class="{ valid: !$v.frete.data.$invalid, invalid: $v.frete.data.$invalid }"
                v-model="$v.frete.data.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.frete.prazoDeEntrega')" for="frete-prazoDeEntrega"
              >Prazo De Entrega</label
            >
            <input
              type="number"
              class="form-control"
              name="prazoDeEntrega"
              id="frete-prazoDeEntrega"
              data-cy="prazoDeEntrega"
              :class="{ valid: !$v.frete.prazoDeEntrega.$invalid, invalid: $v.frete.prazoDeEntrega.$invalid }"
              v-model.number="$v.frete.prazoDeEntrega.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.frete.valor')" for="frete-valor">Valor</label>
            <input
              type="number"
              class="form-control"
              name="valor"
              id="frete-valor"
              data-cy="valor"
              :class="{ valid: !$v.frete.valor.$invalid, invalid: $v.frete.valor.$invalid }"
              v-model.number="$v.frete.valor.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.frete.cliente')" for="frete-cliente">Cliente</label>
            <select class="form-control" id="frete-cliente" data-cy="cliente" name="cliente" v-model="frete.cliente">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="frete.cliente && clienteOption.id === frete.cliente.id ? frete.cliente : clienteOption"
                v-for="clienteOption in clientes"
                :key="clienteOption.id"
              >
                {{ clienteOption.nome }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.frete.cidade')" for="frete-cidade">Cidade</label>
            <select class="form-control" id="frete-cidade" data-cy="cidade" name="cidade" v-model="frete.cidade">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="frete.cidade && cidadeOption.id === frete.cidade.id ? frete.cidade : cidadeOption"
                v-for="cidadeOption in cidades"
                :key="cidadeOption.id"
              >
                {{ cidadeOption.nome }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.frete.motorista')" for="frete-motorista">Motorista</label>
            <select class="form-control" id="frete-motorista" data-cy="motorista" name="motorista" v-model="frete.motorista">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="frete.motorista && motoristaOption.id === frete.motorista.id ? frete.motorista : motoristaOption"
                v-for="motoristaOption in motoristas"
                :key="motoristaOption.id"
              >
                {{ motoristaOption.nome }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('freightSystemApp.frete.caminhao')" for="frete-caminhao">Caminhao</label>
            <select class="form-control" id="frete-caminhao" data-cy="caminhao" name="caminhao" v-model="frete.caminhao">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="frete.caminhao && caminhaoOption.id === frete.caminhao.id ? frete.caminhao : caminhaoOption"
                v-for="caminhaoOption in caminhaos"
                :key="caminhaoOption.id"
              >
                {{ caminhaoOption.placa }}
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
            :disabled="$v.frete.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./frete-update.component.ts"></script>
