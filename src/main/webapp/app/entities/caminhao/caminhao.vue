<template>
  <div>
    <h2 id="page-heading" data-cy="CaminhaoHeading">
      <span v-text="$t('freightSystemApp.caminhao.home.title')" id="caminhao-heading">Caminhaos</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('freightSystemApp.caminhao.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'CaminhaoCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-caminhao"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('freightSystemApp.caminhao.home.createLabel')"> Create a new Caminhao </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && caminhaos && caminhaos.length === 0">
      <span v-text="$t('freightSystemApp.caminhao.home.notFound')">No caminhaos found</span>
    </div>
    <div class="table-responsive" v-if="caminhaos && caminhaos.length > 0">
      <table class="table table-striped" aria-describedby="caminhaos">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.caminhao.marca')">Marca</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.caminhao.placa')">Placa</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.caminhao.ano')">Ano</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.caminhao.cargaTotal')">Carga Total</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="caminhao in caminhaos" :key="caminhao.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CaminhaoView', params: { caminhaoId: caminhao.id } }">{{ caminhao.id }}</router-link>
            </td>
            <td>{{ caminhao.marca }}</td>
            <td>{{ caminhao.placa }}</td>
            <td>{{ caminhao.ano }}</td>
            <td>{{ caminhao.cargaTotal }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'CaminhaoView', params: { caminhaoId: caminhao.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'CaminhaoEdit', params: { caminhaoId: caminhao.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(caminhao)"
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
        ><span id="freightSystemApp.caminhao.delete.question" data-cy="caminhaoDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-caminhao-heading" v-text="$t('freightSystemApp.caminhao.delete.question', { id: removeId })">
          Are you sure you want to delete this Caminhao?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-caminhao"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeCaminhao()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./caminhao.component.ts"></script>
