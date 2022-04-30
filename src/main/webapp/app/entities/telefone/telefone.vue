<template>
  <div>
    <h2 id="page-heading" data-cy="TelefoneHeading">
      <span v-text="$t('freightSystemApp.telefone.home.title')" id="telefone-heading">Telefones</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('freightSystemApp.telefone.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'TelefoneCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-telefone"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('freightSystemApp.telefone.home.createLabel')"> Create a new Telefone </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && telefones && telefones.length === 0">
      <span v-text="$t('freightSystemApp.telefone.home.notFound')">No telefones found</span>
    </div>
    <div class="table-responsive" v-if="telefones && telefones.length > 0">
      <table class="table table-striped" aria-describedby="telefones">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.telefone.numero')">Numero</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.telefone.cliente')">Cliente</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.telefone.motorista')">Motorista</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="telefone in telefones" :key="telefone.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'TelefoneView', params: { telefoneId: telefone.id } }">{{ telefone.id }}</router-link>
            </td>
            <td>{{ telefone.numero }}</td>
            <td>
              <div v-if="telefone.cliente">
                <router-link :to="{ name: 'ClienteView', params: { clienteId: telefone.cliente.id } }">{{
                  telefone.cliente.nome
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="telefone.motorista">
                <router-link :to="{ name: 'MotoristaView', params: { motoristaId: telefone.motorista.id } }">{{
                  telefone.motorista.nome
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'TelefoneView', params: { telefoneId: telefone.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'TelefoneEdit', params: { telefoneId: telefone.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(telefone)"
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
        ><span id="freightSystemApp.telefone.delete.question" data-cy="telefoneDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-telefone-heading" v-text="$t('freightSystemApp.telefone.delete.question', { id: removeId })">
          Are you sure you want to delete this Telefone?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-telefone"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeTelefone()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./telefone.component.ts"></script>
