<template>
  <div>
    <h2 id="page-heading" data-cy="CidadeHeading">
      <span v-text="$t('freightSystemApp.cidade.home.title')" id="cidade-heading">Cidades</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('freightSystemApp.cidade.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'CidadeCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-cidade"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('freightSystemApp.cidade.home.createLabel')"> Create a new Cidade </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && cidades && cidades.length === 0">
      <span v-text="$t('freightSystemApp.cidade.home.notFound')">No cidades found</span>
    </div>
    <div class="table-responsive" v-if="cidades && cidades.length > 0">
      <table class="table table-striped" aria-describedby="cidades">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.cidade.nome')">Nome</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.cidade.uf')">Uf</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cidade in cidades" :key="cidade.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CidadeView', params: { cidadeId: cidade.id } }">{{ cidade.id }}</router-link>
            </td>
            <td>{{ cidade.nome }}</td>
            <td v-text="$t('freightSystemApp.Uf.' + cidade.uf)">{{ cidade.uf }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'CidadeView', params: { cidadeId: cidade.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'CidadeEdit', params: { cidadeId: cidade.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(cidade)"
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
        ><span id="freightSystemApp.cidade.delete.question" data-cy="cidadeDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-cidade-heading" v-text="$t('freightSystemApp.cidade.delete.question', { id: removeId })">
          Are you sure you want to delete this Cidade?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-cidade"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeCidade()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./cidade.component.ts"></script>
