<template>
  <div>
    <h2 id="page-heading" data-cy="MotoristaHeading">
      <span v-text="$t('freightSystemApp.motorista.home.title')" id="motorista-heading">Motoristas</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('freightSystemApp.motorista.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'MotoristaCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-motorista"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('freightSystemApp.motorista.home.createLabel')"> Create a new Motorista </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && motoristas && motoristas.length === 0">
      <span v-text="$t('freightSystemApp.motorista.home.notFound')">No motoristas found</span>
    </div>
    <div class="table-responsive" v-if="motoristas && motoristas.length > 0">
      <table class="table table-striped" aria-describedby="motoristas">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.motorista.nome')">Nome</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.motorista.cnh')">Cnh</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.motorista.validadeCnh')">Validade Cnh</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.motorista.genero')">Genero</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="motorista in motoristas" :key="motorista.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'MotoristaView', params: { motoristaId: motorista.id } }">{{ motorista.id }}</router-link>
            </td>
            <td>{{ motorista.nome }}</td>
            <td>{{ motorista.cnh }}</td>
            <td>{{ motorista.validadeCnh }}</td>
            <td v-text="$t('freightSystemApp.Sexo.' + motorista.genero)">{{ motorista.genero }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'MotoristaView', params: { motoristaId: motorista.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'MotoristaEdit', params: { motoristaId: motorista.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(motorista)"
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
        ><span id="freightSystemApp.motorista.delete.question" data-cy="motoristaDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-motorista-heading" v-text="$t('freightSystemApp.motorista.delete.question', { id: removeId })">
          Are you sure you want to delete this Motorista?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-motorista"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeMotorista()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./motorista.component.ts"></script>
