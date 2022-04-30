<template>
  <div>
    <h2 id="page-heading" data-cy="FreteHeading">
      <span v-text="$t('freightSystemApp.frete.home.title')" id="frete-heading">Fretes</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('freightSystemApp.frete.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'FreteCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-frete"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('freightSystemApp.frete.home.createLabel')"> Create a new Frete </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && fretes && fretes.length === 0">
      <span v-text="$t('freightSystemApp.frete.home.notFound')">No fretes found</span>
    </div>
    <div class="table-responsive" v-if="fretes && fretes.length > 0">
      <table class="table table-striped" aria-describedby="fretes">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.frete.data')">Data</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.frete.prazoDeEntrega')">Prazo De Entrega</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.frete.valor')">Valor</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.frete.cliente')">Cliente</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.frete.cidade')">Cidade</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.frete.motorista')">Motorista</span></th>
            <th scope="row"><span v-text="$t('freightSystemApp.frete.caminhao')">Caminhao</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="frete in fretes" :key="frete.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'FreteView', params: { freteId: frete.id } }">{{ frete.id }}</router-link>
            </td>
            <td>{{ frete.data }}</td>
            <td>{{ frete.prazoDeEntrega }}</td>
            <td>{{ frete.valor }}</td>
            <td>
              <div v-if="frete.cliente">
                <router-link :to="{ name: 'ClienteView', params: { clienteId: frete.cliente.id } }">{{ frete.cliente.nome }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="frete.cidade">
                <router-link :to="{ name: 'CidadeView', params: { cidadeId: frete.cidade.id } }">{{ frete.cidade.nome }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="frete.motorista">
                <router-link :to="{ name: 'MotoristaView', params: { motoristaId: frete.motorista.id } }">{{
                  frete.motorista.nome
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="frete.caminhao">
                <router-link :to="{ name: 'CaminhaoView', params: { caminhaoId: frete.caminhao.id } }">{{
                  frete.caminhao.placa
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'FreteView', params: { freteId: frete.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'FreteEdit', params: { freteId: frete.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(frete)"
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
        ><span id="freightSystemApp.frete.delete.question" data-cy="freteDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-frete-heading" v-text="$t('freightSystemApp.frete.delete.question', { id: removeId })">
          Are you sure you want to delete this Frete?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-frete"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeFrete()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./frete.component.ts"></script>
