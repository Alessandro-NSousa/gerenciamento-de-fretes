<template>
  <div>
    <h2 id="page-heading" data-cy="ViagemHeading">
      <span v-text="$t('freightSystemApp.viagem.home.title')" id="viagem-heading">Viagems</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('freightSystemApp.viagem.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ViagemCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-viagem"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('freightSystemApp.viagem.home.createLabel')"> Create a new Viagem </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && viagems && viagems.length === 0">
      <span v-text="$t('freightSystemApp.viagem.home.notFound')">No viagems found</span>
    </div>
    <div class="table-responsive" v-if="viagems && viagems.length > 0">
      <table class="table table-striped" aria-describedby="viagems">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.viagem.previsaoDeEntrega')">Previsao De Entrega</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.viagem.entregueNoPrazo')">Entregue No Prazo</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.viagem.previsaoDeRetorno')">Previsao De Retorno</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.viagem.frete')">Frete</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.viagem.despesa')">Despesa</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="viagem in viagems" :key="viagem.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ViagemView', params: { viagemId: viagem.id } }">{{ viagem.id }}</router-link>
            </td>
            <td>{{ viagem.previsaoDeEntrega }}</td>
            <td>{{ viagem.entregueNoPrazo }}</td>
            <td>{{ viagem.previsaoDeRetorno }}</td>
            <td>
              <div v-if="viagem.frete">
                <router-link :to="{ name: 'FreteView', params: { freteId: viagem.frete.id } }">{{ viagem.frete.data }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="viagem.despesa">
                <router-link :to="{ name: 'DespesaView', params: { despesaId: viagem.despesa.id } }">{{
                  viagem.despesa.tipoDespesa
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ViagemView', params: { viagemId: viagem.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ViagemEdit', params: { viagemId: viagem.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(viagem)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="freightSystemApp.viagem.delete.question" data-cy="viagemDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-viagem-heading" v-text="$t('freightSystemApp.viagem.delete.question', { id: removeId })">
          Are you sure you want to delete this Viagem?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-viagem"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeViagem()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./viagem.component.ts"></script>
